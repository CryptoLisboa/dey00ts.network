'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { SKILLS } from '@/constants/app.constants'
import AuthContext from '@/providers/AuthContext'
import { Button, Progress } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useToast } from 'rc-toastr'
import { useContext, useEffect, useState } from 'react'
import { mutate } from 'swr'

export default function Skills() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useContext(AuthContext)
  const [skills, setSkills] = useState<string[]>(
    user?.skills?.map((s) => s.name) || []
  )

  useEffect(() => {
    setSkills(user?.skills?.map((s) => s.name) || [])
  }, [user?.skills])

  const handleNext = async () => {
    if (!skills.length) {
      toast.error('Please select your skills')
    }

    if (skills.length) {
      try {
        const body = {
          skills: SKILLS.filter((s) => skills.includes(s.name)).map(
            (s) => s.id
          ),
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
          router.push('/signup/bio')
        } else {
          toast.error('Failed to update skills')
        }
      } catch (error) {
        toast.error('Failed to update skills')
        console.error('error', error)
      }
    }
  }
  return (
    <main className='min-h-screen w-full' id='skills'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
        alt='bg'
        className='absolute min-h-[130vh] md:min-h-[120vh]'
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
              value={(100 / 6) * 3}
            />
            <h1 className='text-2xl font-bold text-white text-center'>
              What are your skills?
            </h1>
            <p className='text-base lg:text-xl text-white'>
              Pick up to 5 skills, this will help other to find you and helps us
              connecting you with Y00ts & DeGods with similar interests and
              skills.
            </p>
            <div className='flex flex-wrap justify-center gap-4 w-full'>
              {SKILLS.map(({ name, color }) => (
                <Button
                  key={name}
                  className='p-2 text-lg'
                  variant='bordered'
                  style={{
                    color,
                    borderColor: color,
                    opacity: skills?.includes(name) ? 1 : 0.66,
                  }}
                  onClick={() => {
                    if (skills?.includes(name)) {
                      setSkills(skills?.filter((i) => i !== name))
                    } else {
                      setSkills([...(skills || []), name])
                    }
                  }}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
