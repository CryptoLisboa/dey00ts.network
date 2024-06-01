'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { SKILLS } from '@/constants/app.constants'
import AuthContext from '@/providers/AuthContext'
import { Button, Progress } from '@nextui-org/react'
import { useContext } from 'react'

export default function Skills() {
  const { setSignupData, signupData } = useContext(AuthContext)

  const handleChange = (newData: string[]) => {
    setSignupData({
      ...signupData,
      skills: newData,
    })
  }
  return (
    <main className='dark  overflow-hidden' id='skills'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard nextHref='/signup/bio'>
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
              Pick up to 5 skills, this will help other to find you and helps us connecting you with Y00ts & DeGods with similar interests and skills.
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
                    opacity: signupData?.skills?.includes(name) ? 1 : 0.66,
                  }}
                  onClick={() => {
                    if (signupData?.skills?.includes(name)) {
                      handleChange(
                        signupData?.skills?.filter((i) => i !== name)
                      )
                    } else {
                      handleChange([...(signupData?.skills || []), name])
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
