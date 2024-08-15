import { auth } from '@/auth'
import { UserCreated } from '@/types/app.types'
import { prisma } from '@/utils/db.utils'

export const fetchProfile = async (): Promise<UserCreated> => {
  try {
    const session = await auth()

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        profile: true,
        location: true,
        languages: true,
        contents: true,
        userExperiences: {
          include: {
            experience: {
              include: {
                skill: true,
              },
            },
          },
        },
        dust: true,
        socials: true,
        wallets: true,
        followers: {
          include: {
            follower: true,
          },
        },
        followings: {
          include: {
            following: true,
          },
        },
        collections: {
          include: {
            tokens: true,
          },
        },
      },
    })

    const data = user as UserCreated
    return data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error // Re-throw to handle it at a higher level if necessary
  }
}

export async function searchUsers(
  skills: number[],
  page: number,
  SEARCH_PAGE_SIZE: number
) {
  const skipAmount = (page - 1) * SEARCH_PAGE_SIZE
  const users = await prisma.user.findMany({
    where: {
      active: true,
      ...(skills && skills.length > 0
        ? {
            skills: {
              some: {
                id: {
                  in: skills,
                },
              },
            },
          }
        : {}),
      socials: {
        twitterHandle: {
          not: null,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: SEARCH_PAGE_SIZE,
    skip: skipAmount,
    select: {
      id: true,
      name: true,
      image: true,
      socials: {
        select: {
          id: true,
          twitterHandle: true,
        },
      },
      location: {
        select: {
          id: true,
          name: true,
        },
      },
      skills: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return users
}
