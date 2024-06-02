import { ROUTING } from '@/constants/routing.contants'
import { signIn } from 'next-auth/react'

export const handleLogin = async () =>
  await signIn('deid', {
    redirect: true,
    callbackUrl: ROUTING.APP,
    scope: 'wallets:read collections:read dust:read socials:read',
  })
