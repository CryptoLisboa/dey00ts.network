'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/button'
import { signIn } from 'next-auth/react'

export default function Home() {
  const handleLogin = async () => {
    await signIn(
      'deid',
      // {},
      // {},
      {
        scope: 'wallets:read collections:read dust:read socials:read',
      }
    )
  }
  return (
    <div className='dark' id='root'>
      {/* <header>
        <Navbar />
      </header> */}
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
          <Link href='/signup/welcome'>Sign Up</Link>
          <Link href='/skin-builder'>Skin Builder</Link>
          <Button onClick={handleLogin}>login</Button>
        </div>
      </main>
    </div>
  )
}
