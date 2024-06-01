'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import AuthContext from '@/providers/AuthContext'
import { Progress, Textarea } from '@nextui-org/react'
import { useContext } from 'react'

export default function Bio() {
  const { setSignupData, signupData } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    })
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
        <SignUpCard nextHref='/signup/experiences'>
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
              Pitch yourself to the community and/or share a short
              bio.
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
              value={signupData?.bio}
              onChange={handleChange}
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
