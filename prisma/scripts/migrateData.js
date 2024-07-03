// migrateData.js
const { PrismaClient } = require('@prisma/client')

// Initialize Prisma Clients for source and target databases
const sourcePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://source_user:source_password@source_host:source_port/source_db',
    },
  },
})

const targetPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://target_user:target_password@target_host:target_port/target_db',
    },
  },
})

async function migrateData() {
  try {
    // Fetch all users from the source database
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

    // Insert users into the target database
    for (const user of users) {
      await targetPrisma.user.create({
        data: {
          ...user,
          accounts: {
            create: user.accounts,
          },
          Authenticator: {
            create: user.Authenticator,
          },
          collections: {
            create: user.collections,
          },
          followers: {
            create: user.followers,
          },
          followings: {
            create: user.followings,
          },
          contents: {
            create: user.contents,
          },
          dust: {
            create: user.dust,
          },
          profile: {
            create: user.profile,
          },
          sessions: {
            create: user.sessions,
          },
          socials: {
            create: user.socials,
          },
          userExperiences: {
            create: user.userExperiences,
          },
          wallets: {
            create: user.wallets,
          },
          languages: {
            create: user.languages,
          },
          skills: {
            create: user.skills,
          },
        },
      })
    }

    console.log('Data migration completed successfully.')
  } catch (error) {
    console.error('Error during data migration:', error)
  } finally {
    await sourcePrisma.$disconnect()
    await targetPrisma.$disconnect()
  }
}

migrateData()
