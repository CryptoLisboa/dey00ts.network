import { auth } from '@/auth'
import { prisma } from '@/utils/db.utils'
import {
  Collection,
  Skill,
  Socials,
  Token,
  User,
  Location,
  CountryApi,
  StateApi,
  CityApi,
  Language,
} from '@prisma/client'

export type UserFetchProfileResult =
  | (User & {
      socials:
        | (Socials & {
            twitterHandle: string | null
          })
        | null
      location: Location | null
      skills: Skill[]
      collections: (Collection & {
        tokens: Token[]
      })[]
    })
  | null

export const fetchProfile = async (): Promise<UserFetchProfileResult> => {
  try {
    const session = await auth()

    const user: UserFetchProfileResult = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        profile: true,
        location: true,
        languages: true,
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
        skills: true,
      },
    })

    const data = user as UserFetchProfileResult
    return data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error // Re-throw to handle it at a higher level if necessary
  }
}

export type UserSearchResult = {
  id: string
  name: string | null
  image: string | null
  socials: {
    id: string
    twitterHandle: string | null
  } | null
  location: {
    id: number
    name: string | null
  } | null
  skills: {
    id: number
    name: string
  }[]
  collections: (Collection & {
    tokens: Token[]
  })[]
}

export async function searchUsers(
  skills: number[],
  page: number,
  SEARCH_PAGE_SIZE: number
): Promise<{ users: UserSearchResult[]; nextPage: number | null }> {
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
      collections: {
        some: {
          tokens: {
            some: {},
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: SEARCH_PAGE_SIZE + 1, // Fetch one more record than the page size
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
      skills: {
        select: {
          id: true,
          name: true,
        },
      },
      collections: {
        include: {
          tokens: true,
        },
        where: {
          tokens: {
            some: {},
          },
        },
      },
    },
  })

  const hasNextPage = users.length > SEARCH_PAGE_SIZE
  if (hasNextPage) {
    users.pop() // Remove the extra record
  }

  const nextPage = hasNextPage ? page + 1 : null

  return { users: users as UserSearchResult[], nextPage }
}

export type UserMap = (User & {
  location: Location & {
    country: CountryApi
    state: StateApi
    city: CityApi
  }
  socials: Socials[]
  languages: Language[]
  collections: Collection &
    {
      tokens: Token[]
    }[]
})[]
