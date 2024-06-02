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
    //   wallets: true,
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

  const deletedProfile = await prisma.profile.delete({
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
    await fetchAllUsers()
  //   await fetchUserById('clwxqat1j0000vze0n3d0rgg8')
  //   await deleteUserById('clwxbtai50000umyge1tgeqo3')
  await prisma.$disconnect()
}

main()

/*
model User {
  id              String           @id @default(cuid())
  email           String?          @default("")
  name            String?
  bio             String?
  createdAt       DateTime         @default(now())
  emailVerified   DateTime?
  updatedAt       DateTime         @updatedAt
  externalId      String           @unique
  website         String?
  image           String?
  active          Boolean          @default(false)
  genderId        Int?
  locationId      Int?
  accounts        Account[]
  Authenticator   Authenticator[]
  collections     Collection[]
  followers       Connection[]     @relation("followingConnection")
  followings      Connection[]     @relation("followerConnection")
  contents        Content[]
  dust            Dust?
  profile         Profile?
  sessions        Session[]
  socials         Socials?
  gender          Gender?          @relation("UserToGender", fields: [genderId], references: [id], map: "UserToGenderFK")
  location        Location?        @relation(fields: [locationId], references: [id])
  userExperiences UserExperience[]
  wallets         Wallet[]
  languages       Language[]       @relation("UserLanguages")
  skills          Skill[]          @relation("UserSkills")
}
*/
