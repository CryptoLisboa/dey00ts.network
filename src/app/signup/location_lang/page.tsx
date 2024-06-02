'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Progress, Select, SelectItem } from '@nextui-org/react'
import { useToast } from 'rc-toastr'
import { useContext } from 'react'
import AuthContext from '@/providers/AuthContext'
import { languages, locations } from '@/constants/signup.constants'
import { useRouter } from 'next/navigation'

export default function LocationSignUp() {
  const router = useRouter()
  const { toast } = useToast()

  const { setSignupData, signupData } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = () => {
    if (!signupData?.languages) {
      toast.error('Please select your language')
    }
    if (!signupData?.location) {
      toast.error('Please select your location')
    }

    if (signupData?.languages && signupData?.location) {
      router.push('/signup/skills')
    }
  }
  return (
    <main className='dark  overflow-hidden' id='location'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/3_welcome.png'
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
              value={(100 / 6) * 2}
            />

            <h1 className='text-2xl font-bold text-white text-center'>
              What&apos;s your language and where do you live?
            </h1>

            <p className='text-base lg:text-xl text-white'>
              This enables us to help you find community members around the
              world.
            </p>

            <div className='grid gap-y-6 w-full px-4 items-center'>
              <div className='grid gap-y-2'>
                <h4 className='text-white text-left'>Language</h4>
                <Select
                  variant='bordered'
                  selectionMode='multiple'
                  placeholder='Select Language'
                  name='languages'
                  classNames={{
                    base: 'text-[#AFE5FF]',
                    value: 'text-[#AFE5FF]',
                    popoverContent: 'text-[#AFE5FF] bg-[#111111]',
                    trigger: 'border-[#AFE5FF]',
                  }}
                  onChange={(e: any) => handleChange(e)}
                >
                  {languages.map((language) => (
                    <SelectItem key={language.name} value={language.name}>
                      {language.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className='grid gap-y-2'>
                <h4 className='text-white text-left'>Location</h4>
                <Select
                  variant='bordered'
                  selectionMode='single'
                  placeholder='Select Location'
                  name='location'
                  classNames={{
                    base: 'text-[#AFE5FF]',
                    value: 'text-[#AFE5FF]',
                    popoverContent: 'text-[#AFE5FF] bg-[#111111]',
                    trigger: 'border-[#AFE5FF]',
                  }}
                  onChange={(e: any) => handleChange(e)}
                >
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
