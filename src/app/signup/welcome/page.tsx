import BgImage from '@/components/BackgroundImage'
import SignUpCard from '@/components/cards/SignUp'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export default function WelcomeSignUp() {
  return (
    <main className='dark overflow-hidden' id='welcome'>
      <BgImage
        src='/images/dey00ts_bgs/mobile/1_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard nextHref='/signup/gender'>
          <div className='text-center grid justify-items-center gap-y-5'>
            <div className='relative w-40 h-32 grid'>
              <Image
                as={NextImage}
                src='/images/sign_up/avatar_pfp_welcome.png'
                alt='avatar_pfp_welcome'
                width={160}
                height={128}
                unoptimized
              />
            </div>
            <h1 className='text-3xl font-bold text-white text-center'>
              welcome to DeY00ts.Network
            </h1>
            <p className='text-base lg:text-xl text-[#FF3634]'>
              let&apos;s get to know each other, trade, meet and have fun!
            </p>
            <p className='text-base lg:text-xl text-[##D9D9D9]'>
              your answers to the next few questions will help us know more
              about you and your interest.
            </p>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
