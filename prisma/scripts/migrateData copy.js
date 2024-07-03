const { PrismaClient } = require('@prisma/client')

// Initialize Prisma Clients for source and target databases
const sourcePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:vZoXdpCULyWhgRnckCTXhUcAuBJBZkuO@roundhouse.proxy.rlwy.net:12164/railway',
    },
  },
})

const targetPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:IBFuTbpDRtvONIXZcHkgZSCZSiNEExBG@viaduct.proxy.rlwy.net:43658/railway',
    },
  },
})

async function migrateData() {
  try {
    console.log('Starting data migration...')

    // Fetch and insert genders
    console.log('Fetching genders from source database...')
    const genders = await sourcePrisma.gender.findMany()
    console.log(`Fetched ${genders.length} genders. Inserting into target database...`)
    for (const gender of genders) {
      await targetPrisma.gender.create({
        data: {
          name: gender.name,
        },
      })
    }
    console.log('Inserted genders into target database.')

    // Fetch and insert locations
    console.log('Fetching locations from source database...')
    const locations = await sourcePrisma.location.findMany()
    console.log(`Fetched ${locations.length} locations. Inserting into target database...`)
    for (const location of locations) {
      await targetPrisma.location.create({
        data: {
          name: location.name,
          description: location.description,
          latitude: location.latitude,
          longitude: location.longitude,
          value: location.value,
        },
      })
    }
    console.log('Inserted locations into target database.')

    // Fetch and insert skills
    console.log('Fetching skills from source database...')
    const skills = await sourcePrisma.skill.findMany()
    console.log(`Fetched ${skills.length} skills. Inserting into target database...`)
    for (const skill of skills) {
      await targetPrisma.skill.create({
        data: {
          name: skill.name,
        },
      })
    }
    console.log('Inserted skills into target database.')

    // Fetch and insert languages
    console.log('Fetching languages from source database...')
    const languages = await sourcePrisma.language.findMany()
    console.log(`Fetched ${languages.length} languages. Inserting into target database...`)
    for (const language of languages) {
      await targetPrisma.language.create({
        data: {
          name: language.name,
        },
      })
    }
    console.log('Inserted languages into target database.')

    // Fetch all users from the source database
    console.log('Fetching users from source database...')
    const users = await sourcePrisma.user.findMany({
      include: {
        accounts: true,
        Authenticator: true,
        collections: true,
        followers: true,
        followings: true,
        contents: true,
        dust: true,
        profile: true,
        sessions: true,
        socials: true,
        userExperiences: true,
        wallets: true,
        languages: true,
        skills: true,
      },
    })
    console.log(`Fetched ${users.length} users. Inserting into target database...`)

    let count = 0

    // Insert users into the target database
    for (const user of users) {
      console.log(`Migrating user with email: ${user.email}`)
      await targetPrisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          bio: user.bio,
          createdAt: user.createdAt,
          emailVerified: user.emailVerified,
          updatedAt: user.updatedAt,
          externalId: user.externalId,
          website: user.website,
          image: user.image,
          active: user.active,
          genderId: user.genderId,
          locationId: user.locationId,
          accounts: {
            create: user.accounts.map(account => ({
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
              createdAt: account.createdAt,
              updatedAt: account.updatedAt,
            })),
          },
          Authenticator: {
            create: user.Authenticator.map(auth => ({
              credentialID: auth.credentialID,
              providerAccountId: auth.providerAccountId,
              credentialPublicKey: auth.credentialPublicKey,
              counter: auth.counter,
              credentialDeviceType: auth.credentialDeviceType,
              credentialBackedUp: auth.credentialBackedUp,
              transports: auth.transports,
            })),
          },
          collections: {
            create: user.collections.map(collection => ({
              network: collection.network,
              contract: collection.contract,
            })),
          },
          followers: {
            create: user.followers.map(follower => ({
              followerId: follower.followerId,
              followingId: follower.followingId,
            })),
          },
          followings: {
            create: user.followings.map(following => ({
              followerId: following.followerId,
              followingId: following.followingId,
            })),
          },
          contents: {
            create: user.contents.map(content => ({
              title: content.title,
              body: content.body,
            })),
          },
          dust: {
            create: {
              amount: user.dust.amount,
              preciseAmount: user.dust.preciseAmount,
              decimals: user.dust.decimals,
            },
          },
          profile: {
            create: {
              bio: user.profile.bio,
              avatarUrl: user.profile.avatarUrl,
            },
          },
          sessions: {
            create: user.sessions.map(session => ({
              sessionToken: session.sessionToken,
              expires: session.expires,
              createdAt: session.createdAt,
              updatedAt: session.updatedAt,
            })),
          },
          socials: {
            create: {
              telegramId: user.socials.telegramId,
              telegramUsername: user.socials.telegramUsername,
              discordId: user.socials.discordId,
              discordUsername: user.socials.discordUsername,
              twitterId: user.socials.twitterId,
              twitterHandle: user.socials.twitterHandle,
              twitterUsername: user.socials.twitterUsername,
            },
          },
          userExperiences: {
            create: user.userExperiences.map(ue => ({
              experienceId: ue.experienceId,
            })),
          },
          wallets: {
            create: user.wallets.map(wallet => ({
              address: wallet.address,
              network: wallet.network,
            })),
          },
          languages: {
            create: user.languages.map(language => ({
              name: language.name,
            })),
          },
          skills: {
            create: user.skills.map(skill => ({
              name: skill.name,
            })),
          },
        },
      })
      count++
      console.log(`Migrated ${count} users.`)
    }

    console.log('Data migration completed successfully.')
    console.log(`Migrated ${count} users in total.`)
  } catch (error) {
    console.error('Error during data migration:', error)
  } finally {
    console.log('Disconnecting from databases...')
    await sourcePrisma.$disconnect()
    await targetPrisma.$disconnect()
    console.log('Disconnected from databases.')
  }
}

migrateData()
