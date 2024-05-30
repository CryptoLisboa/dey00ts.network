'use client'

import { SKILLS, SkillNames } from '@/constants/app.constants'
import { Button, Image, Input } from '@nextui-org/react'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AppHomePage() {
  const [skillsSelected, setSkillsSelected] = useState<SkillNames[]>([])
  const router = useRouter()
  const dynamicData = fetch(`/api/user`, { cache: 'no-store' })
    .then((res) => res.json())
    .then((data) => {
      console.log('profile data on app', JSON.stringify(data, null, 2))
      const userIsActive = data.isActive
      if (!userIsActive) {
        router.push('/signup/welcome')
      }
    })
    .catch((err) => {
      console.error(err)
    })
  return (
    <div className='dark' id='root'>
      {/* <header>
        <Navbar />
      </header> */}
      <main className='container pt-0 mx-auto p-4'>
        <div className='flex flex-col items-center mb-4 gap-3'>
          <h1 className='text-2xl font-bold text-white text-center'>
            FIND YOUR fRIENDS FROM THE DeGods AND y00ts COMMUNITY
          </h1>

          <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='location'
              placeholder='Search by: Interest, location, language'
              labelPlacement='outside'
              startContent={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              }
            />
          </div>
        </div>
        <div className='flex items-center mb-4 overflow-x-auto'>
          <div className='flex flex-wrap justify-center gap-4 w-full'>
            {SKILLS.map(({ name, color }) => (
              <Button
                key={name}
                className='p-2 text-lg opacity-60'
                variant='bordered'
                style={{
                  color,
                  borderColor: color,
                  opacity: skillsSelected.includes(name) ? 1 : 0.66,
                }}
                onClick={() => {
                  setSkillsSelected((prev) =>
                    prev.includes(name)
                      ? prev.filter((skill) => skill !== name)
                      : [...prev, name]
                  )
                }}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-3 w-full mb-4 '>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-1'>
                <Image
                  as={NextImage}
                  className='rounded-lg'
                  src='/temp/avatar-square-image.png'
                  width={64}
                  height={64}
                  alt='avatar'
                />

                <div className='flex flex-col'>
                  <strong>Skill</strong>
                  <p>Name</p>
                </div>
              </div>
              <div className='flex'>Country</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
