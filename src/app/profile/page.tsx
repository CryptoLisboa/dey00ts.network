'use client'

import { Button, Image } from '@nextui-org/react'
import NextImage from 'next/image'

export default function Profile() {
  return (
    <main className='container pt-0 mx-auto p-4'>
      <div className='flex flex-col items-center mb-4'>
        <Image
          as={NextImage}
          src='/temp/profile-avatar.png'
          alt='Avatar'
          className='rounded-full w-56 h-56'
          width={224}
          height={224}
        />
        <p className='text-sm font-bold text-gray-400'>@cryptolisboa</p>
      </div>
      <h3 className='mt-4 text-lg text-full-stack font-bold'>Full Stack</h3>
      <div className='flex flex-col gap-1'>
        <div className='flex p-1 gap-3'>
          <Image
            as={NextImage}
            src='/icons/location.svg'
            alt='Location Icon'
            width={24}
            height={24}
          />
          <p>Portugal</p>
        </div>
        <div className='flex p-1 gap-3'>
          <Image
            as={NextImage}
            src='/icons/message.svg'
            alt='Location Icon'
            width={24}
            height={24}
          />
          <p>English</p>
          <p>Portuguese</p>
          <p>Criol</p>
          <p>Spanish</p>
        </div>
      </div>

      <h3 className='mt-4 text-lg font-bold'>Bio</h3>
      <p className='text-sm '>
        cpu janitor. tech aficionado & truth seeker. culture explorer. turning
        thoughts into code poetry since 2015.
      </p>

      <h3 className='mt-4 text-lg font-bold'>Experiences</h3>
      <p className='text-sm '>
        cuf | frontend lead
        <br />
        01/02/2017 - 02/02/2020
      </p>
      <p className='text-sm '>
        web3 | lp donat00r
        <br />
        02/02/2017 - current
      </p>
      <p className='text-sm '>
        dealpha | janitor
        <br />
        03/02/2020 - current
      </p>

      <h3 className='mt-4 text-lg font-bold'>Skills</h3>
      <div className='flex flex-wrap gap-6'>
        <Button className='bg-transparent border-1 border-full-stack text-full-stack'>
          Full Stack
        </Button>
        <Button className='bg-transparent border-1 border-community-builder text-community-builder'>
          Community Builder
        </Button>
        <Button className='bg-transparent border-1 border-space-host text-space-host'>
          Space Host
        </Button>
        <Button className='bg-transparent border-1 border-evm-dev text-evm-dev'>
          EVM Dev
        </Button>
        <Button className='bg-transparent border-1 border-alpha-caller text-alpha-caller'>
          Alpha Caller
        </Button>
      </div>

      <h3 className='mt-4 text-lg font-bold'>Community</h3>
      <div className='flex flex-wrap gap-6'>
        <p className='font-bold'>y00ts</p>
        <p className='font-bold'>DeGods</p>
      </div>

      <div className='mt-4 flex gap-6'>
        <Button className='bg-transparent border-1 border-[#D9D9D980] text-white'>
          <Image
            as={NextImage}
            src='/icons/discord.svg'
            alt='Add Icon'
            width={24}
            height={24}
          />
          username
        </Button>

        <Button className='bg-transparent border-1 border-[#D9D9D980] text-white'>
          <Image
            as={NextImage}
            src='/icons/twitter.svg'
            alt='Add Icon'
            width={24}
            height={24}
          />
          twitter.com/username
        </Button>
      </div>
    </main>
  )
}
