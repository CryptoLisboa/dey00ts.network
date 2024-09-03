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
      skills: true,
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
      include: {
        location: {
          include: {
            _count: {
              select: {
                User: true,
              },
            },
          },
        },
      },
    })

    const shouldCreateNewLocation = user?.location?._count?.User! > 1
    if (shouldCreateNewLocation) {
      const newLocation = await prisma.location.create({
        data: {
          ...(user?.location?.externalCountryId !== undefined && {
            externalCountryId: user?.location?.externalCountryId,
          }),
          ...(user?.location?.externalStateId !== undefined && {
            externalStateId: user?.location?.externalStateId,
          }),
          ...(user?.location?.externalCityId !== undefined && {
            externalCityId: user?.location?.externalCityId,
          }),
          ...(user?.location?.countryId &&
            !isNaN(user?.location?.countryId) && {
              country: { connect: { id: user?.location?.countryId } },
            }),
          ...(user?.location?.stateId &&
            !isNaN(user?.location?.stateId) && {
              state: { connect: { id: user?.location?.stateId } },
            }),
          ...(user?.location?.cityId &&
            !isNaN(user?.location?.cityId) && {
              city: { connect: { id: user?.location?.cityId } },
            }),
        },
      })
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          location: { connect: { id: newLocation?.id } },
        },
      })
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json()
    const { location, languages, bio, gender, skills } = body

    const allLanguages = await prisma.language.findMany()
    const matchedLanguages = allLanguages.filter((lang) =>
      languages?.includes(lang.id)
    )
    const allSkills = await prisma.skill.findMany()
    const matchedSkills = allSkills.filter((skill) =>
      skills?.includes(skill.id)
    )

    console.log('body api/user/ PUT', JSON.stringify(body, null, 2))

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        location: body.location
          ? {
              upsert: {
                create: {
                  ...(location?.externalCountryId !== undefined && {
                    externalCountryId: body.location.externalCountryId,
                  }),
                  ...(location?.externalStateId !== undefined && {
                    externalStateId: body.location.externalStateId,
                  }),
                  ...(location?.externalCityId !== undefined && {
                    externalCityId: body.location.externalCityId,
                  }),
                  ...(location?.countryId !== undefined && {
                    country: { connect: { id: body.location.countryId } },
                  }),
                  ...(location?.stateId !== undefined && {
                    state: { connect: { id: body.location.stateId } },
                  }),
                  ...(location?.cityId !== undefined && {
                    city: { connect: { id: body.location.cityId } },
                  }),
                },
                update: {
                  ...(location?.externalCountryId !== undefined && {
                    externalCountryId: body.location.externalCountryId,
                  }),
                  ...(location?.externalStateId !== undefined && {
                    externalStateId: body.location.externalStateId,
                  }),
                  ...(location?.externalCityId !== undefined && {
                    externalCityId: body.location.externalCityId,
                  }),
                  ...(location?.countryId !== undefined && {
                    country: { connect: { id: body.location.countryId } },
                  }),
                  ...(location?.stateId !== undefined && {
                    state: { connect: { id: body.location.stateId } },
                  }),
                  ...(location?.cityId !== undefined && {
                    city: { connect: { id: body.location.cityId } },
                  }),
                },
              },
            }
          : undefined,
        languages: body.languages
          ? {
              set: [],
              connect: matchedLanguages.map((l) => l.id)?.map((id) => ({ id })),
            }
          : undefined,
        gender: body.gender ? { connect: { id: gender } } : undefined,
        skills: body.skills
          ? {
              set: [], // Clear existing skills
              connect: matchedSkills?.map(({ id }) => ({ id })),
            }
          : undefined,
        profile: body.bio
          ? {
              upsert: {
                create: {
                  bio,
                },
                update: {
                  bio,
                },
              },
            }
          : undefined,
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
