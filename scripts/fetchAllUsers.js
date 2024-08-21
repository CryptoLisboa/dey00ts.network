const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fetchAllUsers() {
  const allUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      website: true,
      createdAt: true,
      updatedAt: true,
      socials: true,
      location: true,
      wallets: true,
    },
  })
  console.log(JSON.stringify(allUsers, null, 2))
}

async function fetchUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      website: true,
      createdAt: true,
      updatedAt: true,
      socials: true,
      location: true,
      wallets: true,
      accounts: true,
      collections: true,
      followers: true,
      followings: true,
      contents: true,
      dust: true,
      profile: true,
    },
  })
  console.log(user)
}

async function deleteUserById(id) {
  // delete users wallets first
  const deletedWallets = await prisma.wallet.deleteMany({
    where: {
      userId: id,
    },
  })

  const deletedContents = await prisma.content.deleteMany({
    where: {
      userId: id,
    },
  })

  const deletedConnections = await prisma.connection.deleteMany({
    where: {
      OR: [
        {
          followerId: id,
        },
        {
          followingId: id,
        },
      ],
    },
  })

  const deletedUserExperiences = await prisma.userExperience.deleteMany({
    where: {
      userId: id,
    },
  })

  const deletedAuthenticators = await prisma.authenticator.deleteMany({
    where: {
      userId: id,
    },
  })

  const deletedSessions = await prisma.session.deleteMany({
    where: {
      userId: id,
    },
  })

  const deletedSocials = await prisma.socials.delete({
    where: {
      userId: id,
    },
  })

  const deletedDust = await prisma.dust.delete({
    where: {
      userId: id,
    },
  })

  //   const deletedProfile = await prisma.profile.delete({
  //     where: {
  //       userId: id,
  //     },
  //   })

  const deletedAccounts = await prisma.account.deleteMany({
    where: {
      userId: id,
    },
  })

  const userCollections = await prisma.collection.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  })

  const collectionIds = userCollections.map((collection) => collection.id)

  // delete tokens associated with collections
  for (let i = 0; i < collectionIds.length; i++) {
    const collectionId = collectionIds[i]
    const deletedTokens = await prisma.token.deleteMany({
      where: {
        collectionId: collectionId,
      },
    })
  }

  const deletedCollections = await prisma.collection.deleteMany({
    where: {
      userId: id,
    },
  })

  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  })
  console.log(deletedUser)
}

async function main() {
  // await fetchAllUsers()
  //   await fetchUserById('clwxylmpd0000c81nc8crg3yt')
  await deleteUserById('clwxz6s5f000014j77vpvghum')
  await prisma.$disconnect()
}

main()
