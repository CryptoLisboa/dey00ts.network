import NextAuth, { Account, Session, User } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/utils/db.utils'
import { profile } from '@/auth.profile'
import { NextApiRequest, NextApiResponse } from 'next'
import { AdapterSession, AdapterUser } from 'next-auth/adapters'

export const getAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    adapter: PrismaAdapter(prisma),
    redirectProxyUrl: process.env.REDIRECT_PROXY_URL,
    providers: [
      {
        id: 'deid',
        name: 'de[id]',
        type: 'oauth',
        authorization: {
          url: 'https://de.xyz/oauth/authorize',
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
        profile: profile,
      },
    ],
    callbacks: {
      async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
        console.log('redirect callback', url, baseUrl)
        return url
      },
      authorized({ request, auth }: { request: any; auth: any }) {
        // console.log('authorized callback', request, auth)
        const { pathname } = request.nextUrl
        if (pathname === '/middleware-example') return !!auth
        return true
      },
      async session({
        session,
      }: {
        session: { user: AdapterUser } & AdapterSession & Session
      }) {
        return session
      },
      async signIn({
        user,
        account,
      }: {
        user: AdapterUser | User
        account: Account | null
      }) {
        console.log('signIn callback', user, account)
        setTimeout(async () => {
          if (!account?.providerAccountId) return
          const accountResponseUpdate = await prisma.account.update({
            where: {
              provider_providerAccountId: {
                provider: 'deid',
                providerAccountId: account.providerAccountId,
              },
            },
            data: {
              access_token: accountResponse.access_token,
              refresh_token: accountResponse.refresh_token,
              expires_at: accountResponse.expires_at,
            },
          })
        }, 1000)
        return true
      },
    },
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(
  (req, res, arg3) => {
    const endWithSession = req?.url?.endsWith('/api/auth/session')
    const endWithCsrf = req?.url?.endsWith('/api/auth/csrf')
    const endWithProviders = req?.url?.endsWith('/api/auth/providers')
    if (req && !endWithSession && !endWithCsrf && !endWithProviders) {
      console.log(req) // do something with the request
    }
    return {
      adapter: PrismaAdapter(prisma),
      redirectProxyUrl: process.env.REDIRECT_PROXY_URL,
      providers: [
        {
          id: 'deid',
          name: 'de[id]',
          type: 'oauth',
          authorization: {
            url: 'https://de.xyz/oauth/authorize',
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
          profile: profile,
        },
      ],
      callbacks: {
        async redirect({ url, baseUrl }) {
          console.log('redirect callback', url, baseUrl)
          return url
        },
        authorized({ request, auth }: { request: any; auth: any }) {
          // console.log('authorized callback', request, auth)
          const { pathname } = request.nextUrl
          if (pathname === '/middleware-example') return !!auth
          return true
        },
        async session({ session }) {
          return session
        },
        async signIn({ user, account }) {
          console.log('signIn callback', user, account)
          setTimeout(async () => {
            if (!account?.providerAccountId) return
            const accountResponseUpdate = await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: 'deid',
                  providerAccountId: account.providerAccountId,
                },
              },
              data: {
                access_token: accountResponse.access_token,
                refresh_token: accountResponse.refresh_token,
                expires_at: accountResponse.expires_at,
              },
            })
          }, 1000)
          return true
        },
      },
    }
  }
)

const accountResponse = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI5YWQ4MzFmMi05MTczLTQ4ZTgtYjc3My0xNzJlNGNkMTVhNzMiLCJzY29wZSI6ImVtYWlsOnJlYWQgZHVzdDpyZWFkIHdhbGxldHM6cmVhZCBjb2xsZWN0aW9uczpyZWFkIHNvY2lhbHM6cmVhZCB0ZWxlZ3JhbTpyZWFkIiwic3ViIjoiYWQ1YjFlNWYtYjI5Ni00ZGY2LTlhOTEtN2Q0NDQxYWEwZjE3IiwiZXhwIjoxNzIzNTY3NjA3LCJuYmYiOjE3MjM1NjQwMDcsImlhdCI6MTcyMzU2NDAwNywianRpIjoiOTlmZWUxOWY0MWY2MDNmMWYyNTkwZmZkOWQ3Y2QxNDVjZjYwZTRkMTQ3ZjUxYjNmN2QzZmYzNzM4NWUzNWQyMjliMmYzZjQ1NGE0Y2I2YWEifQ.uAl6YhxEdJkrO6dsOgsabKC1I4IO7isroonQPYdFiaE',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI5YWQ4MzFmMi05MTczLTQ4ZTgtYjc3My0xNzJlNGNkMTVhNzMiLCJhY2Nlc3NfdG9rZW5faWQiOiI5OWZlZTE5ZjQxZjYwM2YxZjI1OTBmZmQ5ZDdjZDE0NWNmNjBlNGQxNDdmNTFiM2Y3ZDNmZjM3Mzg1ZTM1ZDIyOWIyZjNmNDU0YTRjYjZhYSIsInJlZnJlc2hfdG9rZW5faWQiOiJjOGYyNjk5YzhmNDYwODVkM2E3N2Q0NzVlNDNkMjFkNDliMzZjZDNhZmFhYTVlYmU1ODZjMDNlZTViNWIwNGUyZmRmODNmZDc5NjUyMjVkMiIsInNjb3BlIjoiZW1haWw6cmVhZCBkdXN0OnJlYWQgd2FsbGV0czpyZWFkIGNvbGxlY3Rpb25zOnJlYWQgc29jaWFsczpyZWFkIHRlbGVncmFtOnJlYWQiLCJ1c2VyX2lkIjoiYWQ1YjFlNWYtYjI5Ni00ZGY2LTlhOTEtN2Q0NDQxYWEwZjE3IiwiZXhwaXJlX3RpbWUiOjE3MjM1NzEyMDgsImlhdCI6MTcyMzU2NDAwN30.hwom6chYaXVx1ehsQbDDIulpVKWSxlTmWLGoaxzDRVE',
  scope:
    'email:read dust:read wallets:read collections:read socials:read telegram:read',
  expires_at: 1723567607,
  providerAccountId: 'ad5b1e5f-b296-4df6-9a91-7d4441aa0f17',
}
