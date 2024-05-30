'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Button, Progress } from '@nextui-org/react'
import { useState } from 'react'
import ExperienceForm from '@/components/forms/ExperienceForm'

export default function Experiences() {
  const [experiences, setExperiences] = useState<number>(1)

  const onAddExperience = () => {
    setExperiences(experiences + 1)
  }

  const onRemoveExperience = () => {
    setExperiences(experiences - 1)
  }

  return (
    <main className='dark overflow' id='experiences'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard nextHref='/signup/connect_de_id'>
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
              Share your experience
            </h1>
            <p className='text-base lg:text-xl text-white'>
              This helps us find more relevant content.
            </p>
            <div className='w-full flex flex-row justify-between items-center mt-6'>
              <div className='text-base text-left'>Add Experience</div>
              <Button
                className='bg-[#212121] text-white text-center text-2xl md:text-3xl shadow-md shadow-white w-4 h-8 grid justify-center items-center'
                variant='shadow'
                size='sm'
                onClick={onAddExperience}
              >
                +
              </Button>
            </div>
            <div className='grid gap-y-12 w-full'>
              {Array.from({ length: experiences }, (_, i) => i).map(
                (_, index) => (
                  <ExperienceForm
                    key={index}
                    onRemoveExperience={onRemoveExperience}
                    index={index}
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
