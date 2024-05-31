'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Button, Progress } from '@nextui-org/react'
import { useContext, useState } from 'react'
import ExperienceForm from '@/components/forms/ExperienceForm'
import AuthContext from '@/providers/AuthContext'

const prepareData = (data: any) => {
  console.log('data for submission', JSON.stringify(data, null, 2))
  return data
}

export default function Experiences() {
  const [experiences, setExperiences] = useState<number>(1)
  const { signupData } = useContext(AuthContext)

  const onAddExperience = () => {
    setExperiences(experiences + 1)
  }

  const onRemoveExperience = () => {
    setExperiences(experiences - 1)
  }

  const onNext = async () => {
    // get signup data from context
    // prepare data for submission to backend
    const data = prepareData(signupData)
    // call api to submit data

    // const response = await fetch('/api/user/create', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })

    // deal with response
    // if (response.ok) {
    //   // navigate to next page
    // } else {
    //   // handle error
    // }
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
        <SignUpCard onClick={onNext}>
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
              >
                <div className='text-white text-2xl md:text-3xl  flex justify-center items-center text-center leading-none'>
                  +
                </div>
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
