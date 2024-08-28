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
      console.log(
        'Adding new collection',
        JSON.stringify(collectionToAdd, null, 2)
      )
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
        })
        .catch((error) => {
          console.error('Error upserting collection', error)
        })
        .finally(() => {
          console.log('All collections added')
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
            prisma.token
              .upsert({
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
              .then((token) => {
                console.log('token upserted', JSON.stringify(token, null, 2))
              })
              .catch((error) => {
                console.error('Error upserting token', error)
              })
          })
        })
    })
  }

  console.log('Processing tokens from collections already added')

  const isTokenFromExistingCollection = (token: TokenToAdd) =>
    !collectionsToAdd.find(
      (c) => c.contract === token.contract && c.network === token.network
    )

  tokensToAdd.filter(isTokenFromExistingCollection).forEach((token) => {
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
        console.log(
          'created token',
          JSON.stringify(token, null, 2),
          'in existing collection'
        )
      })
      .catch((error) => {
        console.error('Error upserting token', error)
      })
  })
}

export const profile = (response: { success: boolean; profile: IAuthUser }) => {
  const emailFromResponse = response?.profile?.email
  let email = emailFromResponse
  if (!email) {
    const placeholderEmail = `${response?.profile?.id}@${
      response?.profile?.socials?.twitterUsername ||
      response?.profile?.socials?.twitterHandle ||
      response?.profile?.socials?.twitterId ||
      response?.profile?.socials?.discordUsername ||
      response?.profile?.socials?.telegramUsername
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
      const removeNull = (
        token: (Token & { collection: Collection }) | undefined
      ) => token !== undefined
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
        .filter(removeNull)
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
            console.log('deleted tokens', JSON.stringify(tokens, null, 2))
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
