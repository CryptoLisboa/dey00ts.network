import { prisma } from '@/utils/db.utils'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// create GET service to return the user
export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth()
  const expires = session?.expires
  const userFromSession = session?.user
  const isInvalidSession = !userFromSession || !expires
  if (isInvalidSession) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const expiryDate = new Date(expires)
  const now = new Date()
  const isExpired = expiryDate < now
  if (isExpired) {
    return new Response(JSON.stringify({ error: 'Session expired' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userFromSession?.id,
    },
    include: {
      profile: true,
      location: true,
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
      languages: {
        include: {
          users: true,
        },
      },
      followers: true,
      followings: true,
      collections: { include: { tokens: true } },
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
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const session = await auth()
    const expires = session?.expires
    const userFromSession = session?.user
    const isInvalidSession = !userFromSession || !expires
    if (isInvalidSession) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    const expiryDate = new Date(expires)
    const now = new Date()
    const isExpired = expiryDate < now
    if (isExpired) {
      return new Response(JSON.stringify({ error: 'Session expired' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userFromSession?.id,
      },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json()
    const { location, languages, bio } = body

    const allLanguages = await prisma.language.findMany()
    const matchedLanguages = allLanguages.filter((lang) =>
      languages.includes(lang.id)
    )

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        location: location.id ? { connect: { id: location.id } } : undefined,
        languages: {
          set: [], // Clear existing languages
          connect: matchedLanguages.map((l) => l.id)?.map((id) => ({ id })),
        },
        // languages: {
        //   update: matchedLanguages.map((language: any) => ({
        //     where: { id: language.id },
        //     data: language,
        //   })),
        //   // connectOrCreate: languages.map((language: any) => ({
        //   //   where: { id: language.id },
        //   //   create: language,
        //   // })),
        // },
        profile: {
          update: {
            bio,
          },
        },
      },
    })
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in: /user PUT', error)
    return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
