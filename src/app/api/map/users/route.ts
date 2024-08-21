import { prisma } from '@/utils/db.utils'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

interface SearchUsersForm {
  skills: number[]
}
function getRandomLatLng() {
  const lat = Math.random() * 180 - 90 // Latitude values range from -90 to 90
  const lng = Math.random() * 360 - 180 // Longitude values range from -180 to 180
  return { lat, lng }
}
// create GET service to return the user
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const users = await prisma.user.findMany({
      where: {
        active: true,
        socials: {
          twitterHandle: {
            not: null,
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
        languages: true,
        collections: { include: { tokens: true } },
      },
    })

    return new Response(JSON.stringify(users), {
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