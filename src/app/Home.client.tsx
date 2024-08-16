'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import { ROUTING } from '@/constants/routing.contants'

export const Home = () => {
  return (
    <main className='flex flex-col items-center justify-center h-[85vh]'>
      <h1 className='font-offbit text-6xl md:text-8xl font-bold'>
        DeGods Network
      </h1>
      <h2 className='font-offbit text-4xl md:text-6xl'>
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
        <Link href={ROUTING.APP} prefetch={true}>
          <Button color='primary' className='font-offbit font-extrabold'>
            App
          </Button>
        </Link>
        <Link href={ROUTING.SKIN_BUILDER} prefetch={true}>
          <Button color='warning' className='font-offbit font-extrabold'>
            Skin Builder
          </Button>
        </Link>
        {/* {!isAuthenticated && <LoginButton />} */}
      </div>
    </main>
  )
}
