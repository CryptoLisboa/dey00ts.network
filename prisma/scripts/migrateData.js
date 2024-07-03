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

    // Fetch and create ID mappers for genders
    console.log('Fetching genders from both databases...')
    const sourceGenders = await sourcePrisma.gender.findMany()
    const targetGenders = await targetPrisma.gender.findMany()
    const genderIdMap = {}
    sourceGenders.forEach((gender, index) => {
      genderIdMap[gender.id] = targetGenders[index].id
    })
    console.log('Created gender ID map.', JSON.stringify(genderIdMap, null, 2))

    // Fetch and create ID mappers for locations
    console.log('Fetching locations from both databases...')
    const sourceLocations = await sourcePrisma.location.findMany()
    const targetLocations = await targetPrisma.location.findMany()
    const locationIdMap = {}
    sourceLocations.forEach((location, index) => {
      locationIdMap[location.id] = targetLocations[index].id
    })
    console.log('Created location ID map.', JSON.stringify(locationIdMap, null, 2))

    // Fetch and create ID mappers for skills
    console.log('Fetching skills from both databases...')
    const sourceSkills = await sourcePrisma.skill.findMany()
    const targetSkills = await targetPrisma.skill.findMany()
    const skillIdMap = {}
    sourceSkills.forEach((skill, index) => {
      skillIdMap[skill.id] = targetSkills[index].id
    })
    console.log('Created skill ID map.', JSON.stringify(skillIdMap, null, 2))

    // Fetch and create ID mappers for languages
    console.log('Fetching languages from both databases...')
    const sourceLanguages = await sourcePrisma.language.findMany()
    const targetLanguages = await targetPrisma.language.findMany()
    const languageIdMap = {}
    sourceLanguages.forEach((language, index) => {
      languageIdMap[language.id] = targetLanguages[index].id
    })
    console.log('Created language ID map.', JSON.stringify(languageIdMap, null, 2))

    // Fetch and create ID mappers for experiences
    console.log('Fetching experiences from both databases...')
    const sourceExperiences = await sourcePrisma.experience.findMany()
    const targetExperiences = await targetPrisma.experience.findMany()
    const experienceIdMap = {}
    sourceExperiences.forEach((experience, index) => {
      experienceIdMap[experience.id] = targetExperiences[index].id
    })
    console.log('Created experience ID map.', JSON.stringify(experienceIdMap, null, 2))

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
      console.log(`Migrating user with externalId: ${user.externalId}`)

      // Check if user with the same externalId already exists
      const existingUser = await targetPrisma.user.findUnique({
        where: { externalId: user.externalId },
      })

      if (existingUser) {
        console.log(`User with externalId ${user.externalId} already exists. Skipping...`)
        continue
      }
      else {
        console.log(`User with externalId ${user.externalId} does not exist. Inserting...`)
      }

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
          genderId: genderIdMap[user.genderId],
          locationId: locationIdMap[user.locationId],
          accounts: {
            create: user.accounts.map((account) => ({
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
            create: user.Authenticator.map((auth) => ({
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
            create: user.collections.map((collection) => ({
              network: collection.network,
              contract: collection.contract,
            })),
          },
          followers: {
            create: user.followers.map((follower) => ({
              followerId: follower.followerId,
              followingId: follower.followingId,
            })),
          },
          followings: {
            create: user.followings.map((following) => ({
              followerId: following.followerId,
              followingId: following.followingId,
            })),
          },
          contents: {
            create: user.contents.map((content) => ({
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
            create: user.sessions.map((session) => ({
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
            create: user.userExperiences.map((ue) => ({
              experienceId: experienceIdMap[ue.experienceId],
            })),
          },
          wallets: {
            create: user.wallets.map((wallet) => ({
              address: wallet.address,
              network: wallet.network,
            })),
          },
          languages: {
            create: user.languages.map((language) => ({
              name: sourceLanguages.find(
                (sourceLanguage) => sourceLanguage.id === language.id
              ).name,
            })),
          },
          skills: {
            create: user.skills.map((skill) => ({
              name: sourceSkills.find(
                (sourceSkill) => sourceSkill.id === skill.id
              ).name,
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
