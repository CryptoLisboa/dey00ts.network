import { prisma } from '@/utils/db.utils'
import { NextRequest } from 'next/server'
import { auth } from '@/auth'
import { SignupData } from '@/types/app.types'

interface ExtendedSignupData extends Partial<SignupData> {
  genderId?: number // New optional property for gender ID
  locationId?: number // New optional property for location ID
  languageIds?: number[] // New optional property for language IDs
  skillIds?: number[] // New optional property for skill IDs
}

export async function POST(req: NextRequest) {
  const session = await auth()
  const userFromSession = session?.user
  const expires = session?.expires

  if (!userFromSession || !expires) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (new Date(expires) < new Date()) {
    return new Response(JSON.stringify({ error: 'Session expired' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data: ExtendedSignupData = await req.json()

  const updateData = {
    active: true,
    userExperiences: {
      deleteMany: {},
      create: data.experiences?.map((exp) => ({
        experience: {
          create: {
            role: exp.role,
            description: exp.description,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ?? new Date(exp.endDate),
            current: exp.current,
            skill: { connect: { id: parseInt(exp.skill) } },
            company: exp.company,
          },
        },
      })),
    },
  }

  try {
    const user = await prisma.user.update({
      where: { id: userFromSession.id },
      data: updateData,
      include: {
        profile: true,
        gender: true,
        location: true,
        languages: true,
        skills: true,
        userExperiences: {
          include: {
            experience: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to update user profile',
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
