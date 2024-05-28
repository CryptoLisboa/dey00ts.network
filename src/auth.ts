import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/utils/db.utils'
import { IAuthUser } from './types/auth.types'

function removeNullProperties<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeNullProperties(item)) as unknown as T
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null) {
        ;(acc as any)[key] = removeNullProperties(value)
      }
      return acc
    }, {} as T)
  }
  return obj
}

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
          scope:
            'wallets:read collections:read dust:read socials:read email:read telegram:read',
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
        const userObj = removeNullProperties({
          ...response.profile,
          externalId: response.profile.id,
        })

        console.log('response de id auth obj processed', userObj)

        return userObj
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
