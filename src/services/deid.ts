import { signIn } from 'next-auth/react'

export const handleLogin = async () =>
  await signIn('deid', {
    redirect: true,
    callbackUrl: '/app',
    scope: 'wallets:read collections:read dust:read socials:read',
  })
