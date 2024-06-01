import NextAuth, { DefaultSession } from 'next-auth'
import { DefaultJWT } from '@auth/core/jwt'

type User = {
  active: boolean
  bio: string | null
  createdAt: string
  email: string
  emailVerified: string | null
  externalId: string
  genderId: number
  id: string
  image: string
  locationId: number
  name: string
  updatedAt: string
  website: string | null
}

declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session {
    user: {
      id: string
    } & User
  }
}
