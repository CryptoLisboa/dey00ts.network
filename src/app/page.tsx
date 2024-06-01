'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/button'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
  const { status: sessionStatus } = useSession()

  const handleLogin = async () =>
    await signIn('deid', {
      redirect: true,
      callbackUrl: '/app',
      scope: 'wallets:read collections:read dust:read socials:read',
    })

  const isAuthenticated =
    sessionStatus === 'authenticated' 

  return (
    <div className='dark' id='root'>
      <main className='flex flex-col items-center justify-center h-[85vh]'>
        <h1 className='font-rowdies text-4xl md:text-6xl'>DeY00ts.Network</h1>
        <h2 className='font-rowdies text-2xl md:text-4xl'>
          Made by
          <Link className='underline' href='https://twitter.com/lisbonlabs'>
            {' '}
            {['L', 'i', 's', 'b', 'o', 'n', 'L', 'a', 'b', 's'].map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: i / 20,
                }}
                key={i}
              >
                {el}
              </motion.span>
            ))}
          </Link>
        </h2>

        <div className='flex flex-wrap items-center gap-12 mt-6 font-lucky'>
          <Link href='/signup/connect_de_id'>Sign Up</Link>
          <Link href='/skin-builder'>Skin Builder</Link>
          {isAuthenticated && <Link href='/app'>App</Link>}
          {!isAuthenticated && <Button onClick={handleLogin}>Login</Button>}
        </div>
      </main>
    </div>
  )
}
