'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Button, DatePicker, Input, Progress, Switch } from '@nextui-org/react'
import { useState } from 'react'

function ExperienceForm({
  onRemoveExperience,
}: {
  onRemoveExperience: () => void
}) {
  const [isCurrent, setIsCurrent] = useState(false)
  return (
    <div className='grid gap-y-4 w-full'>
      <Input
        key='Project name'
        variant='bordered'
        placeholder='xyz'
        className='text-[#D9D9D9] border-[#AFE5FF]'
        size='lg'
        labelPlacement='outside'
        label='Project name'
      />
      <Input
        key='Role'
        variant='bordered'
        placeholder='magician'
        className='text-[#D9D9D9] border-[#AFE5FF]'
        size='lg'
        labelPlacement='outside'
        label='Role'
      />
      <div className='grid grid-cols-2 gap-x-6'>
        <DatePicker
          labelPlacement='outside'
          label={'Start'}
          variant='bordered'
          classNames={{
            label: 'text-left',
          }}
        />
        <DatePicker
          labelPlacement='outside'
          label={'End'}
          variant='bordered'
          classNames={{
            label: 'text-left',
          }}
          isDisabled={isCurrent}
        />
      </div>
      <div className='w-full flex flex-row justify-between gap-x-4 content-center'>
        <Button
          className='bg-[#212121] text-white text-center text-2xl md:text-3xl shadow-md shadow-white w-4 h-8 grid justify-center items-center'
          variant='shadow'
          size='sm'
          onClick={onRemoveExperience}
        >
          -
        </Button>
        <div className='flex flex-row'>
          <div className='text-base text-left'>Current</div>
          <Switch
            aria-label='current work'
            onClick={() => setIsCurrent(!isCurrent)}
          />
        </div>
      </div>
    </div>
  )
}

export default function Experiences() {
  const [experiences, setExperiences] = useState<number>(0)

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
