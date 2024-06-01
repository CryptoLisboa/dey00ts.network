'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Button, Progress, Spinner } from '@nextui-org/react'
import { useContext, useState } from 'react'
import ExperienceForm from '@/components/forms/ExperienceForm'
import AuthContext from '@/providers/AuthContext'
import { GENDERS, SKILLS } from '@/constants/app.constants'
import { languages, locations } from '@/constants/signup.constants'
import { SignupData } from '@/types/app.types'
import { useRouter } from 'next/navigation'

const prepareData = (signupData: Partial<SignupData>) => {
  const genderId = GENDERS.find(
    ({ name }) => name.toLowerCase() === signupData?.gender
  )?.id
  const languageIds = signupData?.languages
    ?.split(',')
    .map((lang) => languages.find(({ name }) => name === lang)?.id)
  const locationId = locations.find(
    ({ value }) => value === signupData?.location
  )?.id
  const skillIds = signupData?.skills?.map(
    (skill) => SKILLS.find(({ name }) => name === skill)?.id
  )
  const dataForSubmission = {
    ...signupData,
    genderId,
    languageIds,
    locationId,
    skillIds,
  }
  console.log('data for submission', JSON.stringify(dataForSubmission, null, 2))
  return dataForSubmission
}

export default function Experiences() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const [experiences, setExperiences] = useState<number>(1)
  const { signupData } = useContext(AuthContext)

  const onAddExperience = () => {
    setExperiences(experiences + 1)
  }

  const onRemoveExperience = () => {
    setExperiences(experiences - 1)
  }

  const onNext = async () => {
    setIsSubmitting(true)
    const data = prepareData(signupData as Partial<SignupData>)

    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    setIsSubmitting(false)

    if (response.ok) {
      router.push('/app')
    }
  }

  const clicksDisabled = isSubmitting
  const nextDisabled = clicksDisabled || experiences === 0

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
                disabled={clicksDisabled || experiences === 5}
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
