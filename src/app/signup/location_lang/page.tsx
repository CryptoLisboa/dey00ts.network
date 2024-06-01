import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Progress } from '@nextui-org/react'
import { LocationForm } from './LocationForm.client'

export default function LocationSignUp() {
  return (
    <main className='dark  overflow-hidden' id='location'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/3_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard nextHref='/signup/skills'>
          <div className='text-center grid justify-items-center gap-y-5'>
            <Progress
              size='sm'
              radius='sm'
              classNames={{
                base: 'px-16',
                indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
              }}
              value={(100 / 6) * 2}
            />

            <h1 className='text-2xl font-bold text-white text-center'>
              What&apos;s your language and where do you live?
            </h1>

            <p className='text-base lg:text-xl text-white'>
              This enables us to help you find community members around the world.
            </p>

            <LocationForm />
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
