import NextAuth, { DefaultSession } from 'next-auth'
import { DefaultJWT } from '@auth/core/jwt'

declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}
