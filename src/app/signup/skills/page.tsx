'use client'
import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Button, Progress } from '@nextui-org/react'
import { color } from 'framer-motion'
import { useState } from 'react'

const SKILLS = [
  { name: 'Alpha Caller', color: '#BD8BFF' },
  { name: 'Collab Manager', color: '#06F0FF' },
  { name: 'Community Builder', color: '#FF6B6B' },
  { name: 'Sol Dev', color: '#FFC9DF' },
  { name: 'Content Creator', color: '#1BCEA3' },
  { name: 'EVM Dev', color: '#FFFF75' },
  { name: 'Full Stack', color: '#FFA500' },
  { name: 'Space Host', color: '#3792FF' },
]

export default function Skills() {
  const [skillsSelected, setSkillsSelected] = useState<String[]>([])
  return (
    <main className='dark h-screen overflow-hidden' id='skills'>
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
              Pick up 5, this will customize your content created by La Creme De
              La Creme of Y00ts & DeGods community!
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
                    opacity: skillsSelected.includes(name) ? 1 : 0.66,
                  }}
                  onClick={() => {
                    if (skillsSelected.includes(name)) {
                      setSkillsSelected(
                        skillsSelected.filter((i) => i !== name)
                      )
                    } else {
                      setSkillsSelected([...skillsSelected, name])
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