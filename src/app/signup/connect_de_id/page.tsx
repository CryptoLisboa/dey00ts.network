'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import { Button } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function ConnectDeIDSignUp() {
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
    <main className='dark h-screen overflow-hidden' id='gender'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/2_welcome.png'
        alt='bg'
        className='absolute'
      />

      <BgImage
        src='/images/sign_up/connect-deid-bg.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full px-4 sm:px-24 md:px-32 lg:px-96'>
        <div className='text-center grid justify-items-center gap-y-3 pt-12'>
          <h1 className='text-3xl font-bold text-white text-center'>
            Connect your DeID
          </h1>
          <p className='text-base lg:text-xl text-white'>
            Explore, discover, meet and try some $hits! The place where to find
            your closest new friends.
          </p>
          {/* <div className='mx-16'> */}
          <Button
            className='bg-black w-full lg:h-11 text-white text-sm md:text-3xl shadow-md shadow-white custom-shadow'
            variant='shadow'
            size='sm'
            onClick={handleLogin}
          >
            <p>Connect</p>
            <Image
              src='/images/buttons/de_id.svg'
              alt='de_id'
              width={64}
              height={64}
            />
          </Button>
          {/* </div> */}
        </div>
      </div>
    </main>
  )
}
