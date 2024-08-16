import { IAuthUser } from '@/types/auth.types'
import { prisma } from '@/utils/db.utils'

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
    })
    .then((user) => {
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
              // collections: userObj.collections
              //   ? {
              //       upsert: userObj.collections.create.map((collection) => {
              //         return prisma.collection.findUnique({
              //           where: {
              //             contract_network_userId: {
              //               contract: collection.contract,
              //               network: collection.network,
              //               userId: user.id,
              //             },
              //           },
              //         }).then((existingCollection) => ({
              //           where: {
              //             id: existingCollection ? existingCollection.id : -1, // Use a dummy id if not found
              //           },
              //           create: collection,
              //           update: collection,
              //         }));
              //       }),
              //     }
              //   : undefined,
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