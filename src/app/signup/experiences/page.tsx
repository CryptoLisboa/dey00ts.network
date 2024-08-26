'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Button, Progress, Spinner } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import ExperienceForm from '@/components/forms/ExperienceForm'
import AuthContext from '@/providers/AuthContext'
import { GENDERS, SKILLS } from '@/constants/app.constants'
import { languages, locations } from '@/constants/signup.constants'
import { Experience, SignupData } from '@/types/app.types'
import { useRouter } from 'next/navigation'
import { ROUTING } from '@/constants/routing.contants'

export default function Experiences() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()

  const [experiencesCount, setExperiencesCount] = useState<number>(1)
  const [experiences, setExperiences] = useState<Experience[]>([])

  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user?.userExperiences) {
      setExperiencesCount(user.userExperiences.length)
    }
  }, [user?.userExperiences?.length, user?.userExperiences])

  useEffect(() => {
    if (user?.userExperiences) {
      console.log({ userE: user?.userExperiences })
      const newExp: Experience[] = user.userExperiences?.map((exp, index) => ({
        company: exp.experience.company,
        role: exp.experience.role,
        description: exp.experience.description,
        skill: String(exp.experience.skill.id),
        current: exp.experience.current,
        startDate: exp.experience.startDate,
        endDate: exp.experience.endDate,
        index,
        // index: exp.index,
      }))

      setExperiences(newExp)
    }
  }, [user?.userExperiences])

  console.log({ user: user?.userExperiences })

  const onAddExperience = () => {
    setExperiencesCount(experiencesCount + 1)
  }

  const onRemoveExperience = () => {
    setExperiencesCount(experiencesCount - 1)
  }

  const onNext = async () => {
    setIsSubmitting(true)
    const body = { experiences }

    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push(ROUTING.APP)
    }
  }

  const clicksDisabled = isSubmitting
  const nextDisabled = clicksDisabled || experiencesCount === 0

  return (
    <main className='dark overflow' id='experiences'>
      <div
        className={`${
          isSubmitting
            ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-80'
            : 'hidden'
        }`}
      >
        {!isSubmitting && <Spinner size='lg' color='success' />}
      </div>
      <BackButton disabled={clicksDisabled} />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard disabled={nextDisabled} onClick={onNext}>
          <div className='text-center grid justify-items-center gap-y-10'>
            <Progress
              size='sm'
              radius='sm'
              classNames={{
                base: 'px-16',
                indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
              }}
              value={(100 / 6) * 5}
            />
            <h1 className='text-3xl font-bold text-white text-center'>
              share your experience
            </h1>
            <p className='text-base lg:text-xl text-white'>
              this helps us connect you with relevant opportunities.
            </p>
            <div className='w-full flex flex-row justify-between items-center mt-6'>
              <div className='text-base text-left'>Add Experience</div>
              <Button
                variant='shadow'
                size='sm'
                className='bg-[#212121] shadow-md shadow-white'
                onClick={onAddExperience}
                disabled={clicksDisabled || experiencesCount === 5}
              >
                <div className='text-white text-2xl md:text-3xl  flex justify-center items-center text-center leading-none'>
                  +
                </div>
              </Button>
            </div>
            <div className='grid gap-y-12 w-full'>
              {Array.from({ length: experiencesCount }, (_, i) => i).map(
                (_, index) => (
                  <ExperienceForm
                    key={index}
                    experiences={experiences}
                    setExperiences={setExperiences}
                    onRemoveExperience={onRemoveExperience}
                    index={index}
                    disabled={clicksDisabled}
                  />
                )
              )}
            </div>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
