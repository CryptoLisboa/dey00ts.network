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

      <div className='flex flex-wrap items-center gap-12 mt-6 font-lucky px-4 lg:px-0'>
        <Link href={ROUTING.APP} prefetch={true}>
          <Button
            color='primary'
            className='p-1 lg:p-2.5 text-center flex flex-col justify-center items-center font-offbit font-extrabold'
            size='sm'
          >
            App
          </Button>
        </Link>
        <Link href={ROUTING.WORLD_MAP} prefetch={true}>
          <Button
            color='secondary'
            className='p-1 lg:p-2.5 text-center flex flex-col justify-center items-center font-offbit font-extrabold'
            size='sm'
          >
            World Map
          </Button>
        </Link>
        <Link href={ROUTING.SKIN_BUILDER} prefetch={true}>
          <Button
            color='warning'
            className='p-1 lg:p-2.5 text-center flex flex-col justify-center items-center font-offbit font-extrabold'
            size='sm'
          >
            Skin Builder
          </Button>
        </Link>
        {/* {!isAuthenticated && <LoginButton />} */}
      </div>
    </main>
  )
}
