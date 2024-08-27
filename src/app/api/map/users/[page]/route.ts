import { prisma } from '@/utils/db.utils'
import { NextRequest } from 'next/server'
import { SEARCH_PAGE_SIZE } from '@/constants/app.constants'

// create GET service to return the user
export async function GET(
  req: NextRequest,
  { params }: { params: { page: string } }
) {
  const page = parseInt(params?.page)
  const skip = (page - 1) * SEARCH_PAGE_SIZE
  const take = SEARCH_PAGE_SIZE + 1 // +1 to check if there is a next page
  try {
    const users = await prisma.user.findMany({
      where: {
        active: true,
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
      include: {
        location: {
          include: {
            country: true,
            state: true,
            city: true,
          },
        },
        socials: true,
        languages: true,
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
      skip,
      take,
    })

    const hasNextPage = users.length > SEARCH_PAGE_SIZE
    const nextPage = hasNextPage ? page + 1 : null
    if (hasNextPage) {
      users.pop() // Remove the extra record
    }
    return new Response(JSON.stringify({ users, nextPage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
