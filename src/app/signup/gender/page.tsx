import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { RadioGroup, Radio, Progress } from '@nextui-org/react'

export default function GenderSignUp() {
  return (
    <main className='dark h-screen overflow-hidden' id='gender'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/2_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard nextHref='/signup/location_lang'>
          <div className='text-center grid justify-items-center gap-y-5'>
            <Progress
              size='sm'
              radius='sm'
              classNames={{
                base: 'px-16',
                indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
              }}
              value={(100 / 6) * 1}
            />

            <h1 className='text-3xl font-bold text-white text-center'>
              what&apos;s your gender?
            </h1>

            <p className='text-base lg:text-xl text-white'>
              this helps us find more relevant content. we won&apos;t show it on
              your profile.
            </p>

            <RadioGroup
              isRequired
              color='success'
              label=''
              classNames={{
                base: 'w-full',
                wrapper: 'grid grid-cols-1 gap-y-5',
              }}
            >
              <Radio color='primary' value='male'>
                <p className='text-white'>male</p>
              </Radio>
              <Radio color='danger' value='female'>
                <p className='text-white'>female</p>
              </Radio>
              <Radio color='warning' value='other'>
                <p className='text-white'>other</p>
              </Radio>
            </RadioGroup>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
