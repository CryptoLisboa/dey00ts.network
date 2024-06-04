'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import AuthContext from '@/providers/AuthContext'
import { Progress, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useToast } from 'rc-toastr'
import { useContext, useEffect, useState } from 'react'
import { mutate } from 'swr'

export default function Bio() {
  const router = useRouter()
  const { toast } = useToast()

  const { user } = useContext(AuthContext)

  const [bio, setBio] = useState<string>(user?.profile?.bio || '')

  useEffect(() => {
    setBio(user?.profile?.bio || '')
  }, [user?.profile?.bio])

  const handleNext = async () => {
    if (!bio) {
      toast.error('Please write your bio')
    }

    if (bio) {
      try {
        const body = {
          bio,
        }

        const response = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        if (response.ok) {
          toast.success('Bio updated')
          mutate('/api/user')
          router.push('/signup/experiences')
        } else {
          toast.error('Failed to update bio')
        }
      } catch (error) {
        toast.error('Failed to update bio')
        console.error('error', error)
      }
    }
  }
  return (
    <main className='dark  overflow-hidden' id='bio'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
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
              value={(100 / 6) * 4}
            />
            <h1 className='text-3xl font-bold text-white text-center'>
              Pitch yourself to the community and/or share a short bio.
            </h1>
            <p className='text-base lg:text-xl text-white'>
              {
                'The request involves sharing information about oneself, allowing others to understand who they are better.'
              }
            </p>
            <Textarea
              key='bordered'
              variant='bordered'
              name='bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder='type here'
              className='text-[#D9D9D9] border-[#AFE5FF] h-full'
              size='lg'
              minRows={5}
            />
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
