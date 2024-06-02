'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import AuthContext from '@/providers/AuthContext'
import { RadioGroup, Radio, Progress } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useToast } from 'rc-toastr'
import { useContext } from 'react'

export default function GenderSignUp() {
  const router = useRouter()
  const { toast } = useToast()

  const { setSignupData, signupData } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      gender: e.target.value,
    })
  }

  const handleNext = () => {
    const isDisabled = !signupData?.gender
    if (isDisabled) {
      toast.error('Please select your gender')
    } else {
      router.push('/signup/location_lang')
    }
  }
  return (
    <main className='dark  overflow-hidden' id='gender'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/2_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard onClick={handleNext}>
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
              this helps us understand our community better. we won&apos;t show
              it on your profile.
            </p>

            <RadioGroup
              isRequired
              color='success'
              label='Gender'
              value={signupData?.gender}
              name='gender'
              onChange={handleChange}
              classNames={{
                base: 'w-full',
                wrapper: 'grid grid-cols-1 gap-y-5 px-10',
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
              <Radio color='warning' value='prefer not to say'>
                <p className='text-white'>prefer not to say</p>
              </Radio>
            </RadioGroup>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
