import { prisma } from '@/utils/db.utils'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

interface SearchUsersForm {
  skills: number[]
}

// create GET service to return the user
export async function POST(req: NextRequest, res: NextResponse) {
  debugger
  try {
    // get skill ids from the query
    const data: SearchUsersForm = await req.json()
    const { skills } = data

    const user = await prisma.user.findMany({
      where: {
        userExperiences: {
          some: {
            experience: {
              skillId: {
                in: skills,
              },
            },
          },
        },
      },
      include: {
        location: true,
        userExperiences: {
          include: {
            experience: {
              include: {
                skill: true,
              },
            },
          },
        },
        socials: true,
      },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

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
