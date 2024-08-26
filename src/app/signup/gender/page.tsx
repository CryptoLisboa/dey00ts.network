'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { GENDERS } from '@/constants/app.constants'
import { ROUTING } from '@/constants/routing.contants'
import AuthContext from '@/providers/AuthContext'
import { RadioGroup, Radio, Progress } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from 'rc-toastr'
import { useContext, useEffect, useState } from 'react'
import { mutate } from 'swr'

export default function GenderSignUp() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useContext(AuthContext)
  const session = useSession()
  const [gender, setGender] = useState<string | null>(
    GENDERS.find((g) => g.id === user?.genderId)?.name || null
  )
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/signup/connect_de_id')
    }
  }, [session, router])

  useEffect(() => {
    setGender(GENDERS.find((g) => g.id === user?.genderId)?.name || null)
  }, [user?.genderId])

  const handleNext = async () => {
    const isDisabled = !gender

    if (isDisabled) {
      toast.error('Please select your gender')
    } else {
      try {
        const genderId = GENDERS.find(
          ({ name }) => name.toLowerCase() === gender?.toLowerCase()
        )?.id

        const body = {
          gender: genderId,
        }

        const response = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        if (response.ok) {
          mutate('/api/user')
          router.push(ROUTING.SIGNUP.LOCATION_LANG)
        } else {
          toast.error('Failed to update gender')
        }
      } catch (error) {
        toast.error('Failed to update gender')
        console.error('error', error)
      }
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
              value={gender}
              name='gender'
              onChange={(e) => setGender(e.target.value)}
              classNames={{
                base: 'w-full',
                wrapper: 'grid grid-cols-1 gap-y-5 px-10',
              }}
            >
              <Radio color='primary' value='Male'>
                <p className='text-white'>male</p>
              </Radio>
              <Radio color='danger' value='Female'>
                <p className='text-white'>female</p>
              </Radio>
              <Radio color='warning' value='Other'>
                <p className='text-white'>other</p>
              </Radio>
              <Radio color='warning' value='Prefer not to say'>
                <p className='text-white'>prefer not to say</p>
              </Radio>
            </RadioGroup>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
