import { NextRequest, NextResponse } from 'next/server'
import { SEARCH_PAGE_SIZE } from '@/constants/app.constants'
import { searchUsers } from '@/services/user'
import { prisma } from '@/utils/db.utils'

interface SearchUsersForm {
  page: number
  skills: number[]
}

// create GET service to return one user
export async function GET(
  req: NextRequest,
  { params }: { params: { userTag: string } }
) {
  try {
    const { userTag } = params
    const user = await prisma.user.findFirst({
      where: {
        socials: {
          twitterHandle: {
            mode: 'insensitive',
            equals: userTag,
          },
        },
      },
      include: {
        profile: true,
        languages: true,
        location: true,
        skills: true,
        socials: true,
        userExperiences: {
          include: {
            experience: {
              include: {
                skill: true,
              },
            },
          },
        },
        collections: {
          include: {
            tokens: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(user), {
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
