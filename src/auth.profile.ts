import { IAuthUser } from '@/types/auth.types'
import { prisma } from '@/utils/db.utils'
import { Collection, Token, User } from '@prisma/client'

function removeNullProperties<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeNullProperties(item)) as unknown as T
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null) {
        ;(acc as any)[key] = removeNullProperties(value)
      }
      return acc
    }, {} as T)
  }
  return obj
}

interface TokenToAdd {
  contract: string
  network: string
  userId: string | undefined
  id: number
  wallet: string
  tokenId: number
  staked: boolean
}

function upsertCollectionsAndTokens(
  tokensToAdd: TokenToAdd[],
  user: (User & { collections: (Collection & { tokens: Token[] })[] }) | null
) {
  const uniqueCollections = new Set<string>()
  const collectionsToAdd = tokensToAdd
    .filter(
      (token) =>
        !user?.collections?.find((c) => {
          return (
            c?.contract === token?.contract && c?.network === token?.network
          )
        })
    )
    .filter((collection) => {
      const key = `${collection.network}-${collection.contract}`
      if (uniqueCollections.has(key)) {
        return false
      } else {
        uniqueCollections.add(key)
        return true
      }
    }) as {
    network: string
    contract: string
    userId: string
  }[]

  console.log('collectionsToAdd', JSON.stringify(collectionsToAdd, null, 2))

  const collectionsAdded: Collection[] = []

  const isAllCollectionsAdded =
    collectionsToAdd?.length === collectionsAdded?.length

  if (!isAllCollectionsAdded) {
    collectionsToAdd.forEach((collectionToAdd) => {
      prisma.collection
        .create({
          data: {
            network: collectionToAdd.network,
            contract: collectionToAdd.contract,
            userId: collectionToAdd.userId,
          },
        })
        .then((collection) => {
          console.log('collection', JSON.stringify(collection, null, 2))
          collectionsAdded.push(collection)
          if (collectionsAdded?.length === collectionsToAdd?.length) {
            tokensToAdd.forEach((token) => {
              const collectionId =
                collectionsAdded.find(
                  (c) =>
                    c.contract === token.contract && c.network === token.network
                )?.id ||
                user?.collections?.find(
                  (c) =>
                    c.contract === token.contract && c.network === token.network
                )?.id
              prisma.token.upsert({
                where: {
                  id: token.id,
                },
                create: {
                  tokenId: token.tokenId,
                  wallet: token.wallet,
                  staked: token.staked,
                  collectionId: collectionId!,
                },
                update: {
                  tokenId: token.tokenId,
                  wallet: token.wallet,
                  staked: token.staked,
                  collectionId: collectionId!,
                },
              })
            })
          }
        })
        .catch((error) => {
          console.error('Error upserting collection', error)
        })
    })
  } else {
    console.log('All collections already added')

    tokensToAdd.forEach((token) => {
      const collectionId = user?.collections?.find(
        (c) => c.contract === token.contract && c.network === token.network
      )?.id
      prisma.token
        .create({
          data: {
            tokenId: token.tokenId,
            wallet: token.wallet,
            staked: token.staked,
            collectionId: collectionId!,
          },
        })
        .then((token) => {
          console.log('token', JSON.stringify(token, null, 2))
        })
        .catch((error) => {
          console.error('Error upserting token', error)
        })
    })
  }
}

export const profile = (response: { success: boolean; profile: IAuthUser }) => {
  const emailFromResponse = response.profile.email
  let email = emailFromResponse
  if (!email) {
    const placeholderEmail = `${response.profile.id}@${
      response.profile.socials.twitterUsername ||
      response.profile.socials.twitterHandle ||
      response.profile.socials.twitterId ||
      response.profile.socials.discordUsername ||
      response.profile.socials.telegramUsername
    }.fake`
    email = placeholderEmail
  }
  const userObj = {
    ...response.profile,
    email: null, // next auth has a bug where it's throwing an error if email is not null
    externalId: response.profile.id,
    socials: {
      create: {
        ...response.profile.socials,
      },
    },
    collections: {
      create: [
        ...response.profile.collections.map((collection) => {
          return {
            ...collection,
            tokens: {
              create: [...collection.tokens],
            },
          }
        }),
      ],
    },
    wallets: {
      create: [...response.profile.wallets],
    },
    dust: {
      create: {
        ...response.profile.dust,
      },
    },
    image: response.profile.imageUrl,
    imageUrl: undefined,
  }

  prisma.user
    .findUnique({
      where: {
        externalId: userObj.externalId,
      },
      include: {
        collections: {
          include: {
            tokens: {
              include: {
                collection: true,
              },
            },
          },
        },
      },
    })
    .then((user) => {
      const tokensToRemove = user?.collections
        ?.flatMap((collection) => {
          return collection.tokens.map((token) => {
            const shouldRemoveToken = !userObj?.collections?.create
              ?.find(
                (c) =>
                  c?.network === token?.collection?.network &&
                  c?.contract === token?.collection?.contract
              )
              ?.tokens?.create?.find((t) => t.tokenId === token.tokenId)
            if (shouldRemoveToken) {
              return { ...token, userId: user?.id }
            }
          })
        })
        .filter((token) => token !== undefined)
      console.log('tokensToRemove', JSON.stringify(tokensToRemove, null, 2))

      const tokensToAdd = userObj?.collections?.create
        ?.flatMap((collection) => {
          return collection?.tokens?.create?.map((token) => {
            const shouldAddToken = !user?.collections
              ?.find((c) => c.contract === collection.contract)
              ?.tokens?.find((t) => t.tokenId === token.tokenId)
            if (shouldAddToken) {
              return {
                ...token,
                contract: collection?.contract,
                network: collection?.network,
                userId: user?.id,
              }
            }
          })
        })
        .filter((token) => token !== undefined)

      console.log('tokensToAdd', JSON.stringify(tokensToAdd, null, 2))

      if (tokensToRemove && tokensToRemove?.length > 0) {
        const tokensToRemoveIds = tokensToRemove
          .map((token) => token?.id)
          .filter((id) => id !== undefined) as number[]
        prisma.token
          .deleteMany({
            where: {
              id: { in: tokensToRemoveIds },
            },
          })
          .then((tokens) => {
            console.log('tokens', JSON.stringify(tokens, null, 2))
          })
          .catch((error) => {
            console.error('Error deleting tokens', error)
          })
        // return
      }
      if (tokensToAdd?.length > 0) {
        upsertCollectionsAndTokens(tokensToAdd, user)
      }

      if (user) {
        prisma.user
          .update({
            where: {
              id: user.id,
            },
            data: {
              image: userObj.image,
              socials: userObj.socials
                ? {
                    upsert: {
                      create: userObj.socials.create,
                      update: userObj.socials.create,
                    },
                  }
                : undefined,
              wallets: userObj.wallets
                ? {
                    upsert: userObj.wallets.create.map((wallet) => ({
                      where: { address: wallet.address },
                      create: wallet,
                      update: wallet,
                    })),
                  }
                : undefined,
              dust: userObj.dust
                ? {
                    upsert: {
                      create: userObj.dust.create,
                      update: userObj.dust.create,
                    },
                  }
                : undefined,
            },
          })
          .then((user) => {
            console.log('User updated', JSON.stringify(user, null, 2))
          })
          .catch((error) => {
            console.error('Error updating user', error)
          })
      }
    })
    .catch((error) => {
      console.error('Error finding user', error)
    })
  return removeNullProperties(userObj)
}

/*
const userObjTemplate = {
        socials: {
          create: {
            telegramId: '474856002',
            telegramUsername: 'CryptoLisboa',
            discordId: '613126953829924896',
            discordUsername: 'cryptolisboa#0',
            twitterId: '942220335264550912',
            twitterHandle: 'CryptoLisboa',
          },
        },
        id: 'ad5b1e5f-b296-4df6-9a91-7d4441aa0f17',
        website: null,
        email: null,
        emailVerified: true,
        dust: {
          create: {
            amount: 26.907897293,
            preciseAmount: '26907897293',
            decimals: 9,
          },
        },
        collections: {
          create: [
            {
              network: 'SOLANA',
              contract: '4mKSoDDqApmF1DqXvVTSL6tu2zixrSSNjqMxUnwvVzy2',
              tokens: {
                create: [
                  {
                    wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                    tokenId: 1449,
                    staked: false,
                  },
                  {
                    wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                    tokenId: 4906,
                    staked: false,
                  },
                  {
                    wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                    tokenId: 14442,
                    staked: false,
                  },
                  {
                    wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                    tokenId: 58,
                    staked: false,
                  },
                ],
              },
            },
            {
              network: 'SOLANA',
              contract: '6XxjKYFbcndh2gDcsUrmZgVEsoDxXMnfsaGY6fpTJzNr',
              tokens: {
                create: [
                  {
                    wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                    tokenId: 8017,
                    staked: false,
                  },
                ],
              },
            },
          ],
        },
        description: null,
        imageUrl: undefined,
        name: 'Ben',
        wallets: {
          create: [
            {
              network: 'ETHEREUM',
              address: '0xe1D3e4efA8729ae9DF488da239f0907202B744a9',
            },
            {
              network: 'ETHEREUM',
              address: '0xB16452961bfBfeB85298A5e2e591bE1042b252C0',
            },
            {
              network: 'ETHEREUM',
              address: '0x3aAa57DAF2D1aF8b6B0F7DC7025A35CAa6c2f0eB',
            },
            {
              network: 'SOLANA',
              address: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
            },
            {
              network: 'ETHEREUM',
              address: '0x719E574633BfA2530b4F05ddBAddDF58e7c45dB3',
            },
          ],
        },
        externalId: 'ad5b1e5f-b296-4df6-9a91-7d4441aa0f17',
        image:
          'https://pbs.twimg.com/profile_images/1821304671081738240/qeI3FyEi.jpg',
      }
      const userTemplate = {
        id: 'clwq6zj1e0002k9zyn4qfot8b',
        email: 'wains-perk0c@icloud.com',
        name: 'Ben',
        bio: null,
        createdAt: '2024-05-28T10:25:36.000Z',
        emailVerified: null,
        updatedAt: '2024-08-22T18:47:35.040Z',
        externalId: 'ad5b1e5f-b296-4df6-9a91-7d4441aa0f17',
        website: null,
        image:
          'https://pbs.twimg.com/profile_images/1821304671081738240/qeI3FyEi.jpg',
        active: true,
        genderId: 1,
        locationId: 53,
        collections: [
          {
            id: 1,
            network: 'ETHEREUM',
            contract: '0x8821BeE2ba0dF28761AffF119D66390D594CD280',
            userId: 'clwq6zj1e0002k9zyn4qfot8b',
            tokens: [
              {
                id: 1,
                wallet: '0xe1D3e4efA8729ae9DF488da239f0907202B744a9',
                tokenId: 8017,
                staked: false,
                collectionId: 1,
              },
            ],
          },
          {
            id: 2,
            network: 'SOLANA',
            contract: '4mKSoDDqApmF1DqXvVTSL6tu2zixrSSNjqMxUnwvVzy2',
            userId: 'clwq6zj1e0002k9zyn4qfot8b',
            tokens: [
              {
                id: 2,
                wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                tokenId: 2159,
                staked: false,
                collectionId: 2,
              },
              {
                id: 3,
                wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                tokenId: 14442,
                staked: false,
                collectionId: 2,
              },
              {
                id: 4,
                wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                tokenId: 58,
                staked: false,
                collectionId: 2,
              },
              {
                id: 5,
                wallet: '8JSpcQNDhQXL5vkKoyvSEmoYCXihMmB2ayNdP959hBEM',
                tokenId: 4906,
                staked: false,
                collectionId: 2,
              },
            ],
          },
        ],
      }
*/
