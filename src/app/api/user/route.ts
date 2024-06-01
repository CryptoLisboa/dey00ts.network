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

  debugger

  const user = await prisma.user.findUnique({
    where: {
      id: userFromSession?.id,
    },
    include: {
      profile: true,
      location: true,
      contents: true,
      userExperiences: true,
      dust: true,
      socials: true,
      wallets: true,
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
