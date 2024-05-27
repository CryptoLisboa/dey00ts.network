import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/utils/db.utils'
import { IAuthUser } from './types/auth.types'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: 'deid',
      name: 'de[id]',
      type: 'oauth',
      authorization: {
        url: 'https://verify.de.xyz/oauth/authorize',
        params: {
          scope: 'wallets:read collections:read dust:read socials:read',
        },
      },
      checks: ['pkce', 'state'],
      token: 'https://api.oauth.dustlabs.com/oauth/token',
      userinfo: 'https://api.oauth.dustlabs.com/profile',
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
      clientId: process.env.DEID_CLIENT_ID as string,
      clientSecret: process.env.DEID_CLIENT_SECRET as string,
      profile(response: { success: boolean; profile: IAuthUser }) {
        return {
          id: response.profile.id,
          name: response.profile.name,
          image: response.profile.imageUrl,
          externalId: response.profile.id,
        }
      },
    },
  ],
  callbacks: {
    authorized({ request, auth }: { request: any; auth: any }) {
      debugger
      const { pathname } = request.nextUrl
      if (pathname === '/middleware-example') return !!auth
      return true
    },
  },
})
