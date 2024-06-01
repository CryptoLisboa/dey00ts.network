/*
data from request {
  "gender": "male",
  "languages": "English,Spanish,Portuguese",
  "location": "us",
  "skills": [
    "Alpha Caller",
    "Community Builder",
    "EVM Dev",
    "Full Stack",
    "Space Host"
  ],
  "bio": "im a fkn degen",
  "experiences": [
    {
      "projectName": "dealpha",
      "skill": "1",
      "role": "janit00r",
      "startDate": "2023-12-15T00:00:00.000Z",
      "endDate": "2024-06-01T00:06:39.886Z",
      "current": true,
      "index": 0
    }
  ],
  "genderId": 1,
  "languageIds": [
    1,
    3,
    9
  ],
  "locationId": 1,
  "skillIds": [
    1,
    3,
    6,
    7,
    8
  ]
}
*/
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
    profile: {
      // Handling bio as part of the Profile relation
      upsert: {
        update: {
          bio: data.bio,
        },
        create: {
          bio: data.bio,
        },
      },
    },
    // Correctly connecting relations with ID as a number
    gender: data.genderId ? { connect: { id: data.genderId } } : undefined,
    location: data.locationId
      ? { connect: { id: data.locationId } }
      : undefined,
    languages: {
      set: [], // Clear existing languages
      connect: data.languageIds?.map((id) => ({ id })),
    },
    skills: {
      set: [], // Clear existing skills
      connect: data.skillIds?.map((id) => ({ id })),
    },
    userExperiences: {
      deleteMany: {}, // Removes all existing experiences
      create: data.experiences?.map((exp) => ({
        experience: {
          create: {
            role: exp.role,
            description: exp.description,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ?? new Date(exp.endDate),
            current: exp.current,
            // Ensuring ID is passed as a number if your schema expects it
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
        profile: true, // Include the profile object
        gender: true, // Include the gender object
        location: true, // Include the location object
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
