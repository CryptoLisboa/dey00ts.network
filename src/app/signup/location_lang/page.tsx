import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Progress } from '@nextui-org/react'
import { LocationForm } from './LocationForm.client'

export default function LocationSignUp() {
  return (
    <main className='dark' id='location'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/3_welcome.png'
        alt='bg'
        className='absolute'
      />
      <SignUpCard nextHref='/signup/interests'>
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
            This helps us find cool people around you to get some connections
            and easily communicate.
          </p>

          <LocationForm />
        </div>
      </SignUpCard>
    </main>
  )
}
