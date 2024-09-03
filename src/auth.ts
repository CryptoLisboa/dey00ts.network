import NextAuth, { Account, Session, User } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/utils/db.utils'
import { profile } from '@/auth.profile'
import { AdapterSession, AdapterUser } from 'next-auth/adapters'

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  const endWithSession = req?.url?.endsWith('/api/auth/session')
  const endWithCsrf = req?.url?.endsWith('/api/auth/csrf')
  const endWithProviders = req?.url?.endsWith('/api/auth/providers')
  const endWithSignOut = req?.url?.endsWith('/api/auth/signout')
  const endWithSignInDeId = req?.url?.endsWith('/api/auth/signin/deid')
  if (
    req &&
    !endWithSession &&
    !endWithCsrf &&
    !endWithProviders &&
    !endWithSignOut &&
    !endWithSignInDeId
  ) {
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
              'wallets:read collections:read dust:read socials:read email:read telegram:read location:read mobile:read',
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
      async signIn({ user, account }) {
        console.log('signIn callback', user, account)
        setTimeout(async () => {
          if (!account?.providerAccountId) return
          const data = {
            access_token: account?.access_token,
            refresh_token: account?.refresh_token,
            expires_at: account?.expires_at,
          }
          console.log('accountResponseUpdate', data)
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: 'deid',
                providerAccountId: account?.providerAccountId,
              },
            },
            select: {
              providerAccountId: true,
            },
          })

          if (existingAccount) {
            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: 'deid',
                  providerAccountId: account?.providerAccountId,
                },
              },
              data,
            })
          } else {
            console.log('Account not found, skipping update.')
          }
        }, 1000)
        return true
      },
    },
  }
})

const accountResponse = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI5YWQ4MzFmMi05MTczLTQ4ZTgtYjc3My0xNzJlNGNkMTVhNzMiLCJzY29wZSI6ImVtYWlsOnJlYWQgZHVzdDpyZWFkIHdhbGxldHM6cmVhZCBjb2xsZWN0aW9uczpyZWFkIHNvY2lhbHM6cmVhZCB0ZWxlZ3JhbTpyZWFkIiwic3ViIjoiYWQ1YjFlNWYtYjI5Ni00ZGY2LTlhOTEtN2Q0NDQxYWEwZjE3IiwiZXhwIjoxNzI0MzU1MTA5LCJuYmYiOjE3MjQzNTE1MDksImlhdCI6MTcyNDM1MTUwOSwianRpIjoiN2M4YmY5MGMwNmUxNWQzOTkzMjU1NTFlNmRhZDc3ZTNkNDYxN2E2ZjExMmVhZGNiODU4MDI2NDA5NTkwMWU5YjgwNTViYTkxZGZhOTIxMzAifQ.PI9d0KEPJFAnCN3061INmxm0FiAWSqwlNv5w0KpzumE',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI5YWQ4MzFmMi05MTczLTQ4ZTgtYjc3My0xNzJlNGNkMTVhNzMiLCJhY2Nlc3NfdG9rZW5faWQiOiI3YzhiZjkwYzA2ZTE1ZDM5OTMyNTU1MWU2ZGFkNzdlM2Q0NjE3YTZmMTEyZWFkY2I4NTgwMjY0MDk1OTAxZTliODA1NWJhOTFkZmE5MjEzMCIsInJlZnJlc2hfdG9rZW5faWQiOiJmMTZjMThjMzZhYTYxMzE5YTM5NzRjYzljY2NlN2I3OGY5NTYyNTkzMDIyYmRkZjFiM2QyYTk2NTZkOTMxMTQwYmU4YWVmMzZmZGU5ZTJjYSIsInNjb3BlIjoiZW1haWw6cmVhZCBkdXN0OnJlYWQgd2FsbGV0czpyZWFkIGNvbGxlY3Rpb25zOnJlYWQgc29jaWFsczpyZWFkIHRlbGVncmFtOnJlYWQiLCJ1c2VyX2lkIjoiYWQ1YjFlNWYtYjI5Ni00ZGY2LTlhOTEtN2Q0NDQxYWEwZjE3IiwiZXhwaXJlX3RpbWUiOjE3MjQzNTg3MTAsImlhdCI6MTcyNDM1MTUwOX0.48vmZMwmxStn_bBY3usiG6ZA3Z8gZ1HRbDtPxE63YYo',
  scope:
    'email:read dust:read wallets:read collections:read socials:read telegram:read',
  expires_at: 1723567607,
  providerAccountId: 'ad5b1e5f-b296-4df6-9a91-7d4441aa0f17',
}
