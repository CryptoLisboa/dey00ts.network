'use client'

import { SkillIds, SKILLS } from '@/constants/app.constants'
import { Button } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { UserList } from '@/app/app/UserList'
import useSWRInfinite from 'swr/infinite'
import { UserSearchResult } from '@/services/user'
import { fetcher } from '@/utils/services'

type IUserSearchAndListProps = {
  skills: SkillIds[]
}

const getKey = (skills: SkillIds[]) => (page: number) =>
  `/api/user/search?page=${page + 1}&skills=${skills}`

export const UserSearchAndList = ({ skills }: IUserSearchAndListProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const swr = useSWRInfinite<{
    users: UserSearchResult[]
    nextPage: number | null
  }>(getKey(skills), fetcher, {
    revalidateFirstPage: false,
    parallel: true,
    initialSize: 2,
  })

  return (
    <main className='container pt-0 mx-auto p-4'>
      <div className='flex flex-col items-center mt-10 lg:mt-15 mb-4 gap-3'>
        <h3 className='font-offbit text-5xl lg:text-8xl font-bold text-white text-center lg:mb-8 mb-4'>
          DeGods
          <div className='text-center text-2xl lg:text-5xl font-offbit'>
            Network
          </div>
        </h3>

        <h5 className='text-lg lg:text-xl font-bold text-white text-center font-argent'>
          Connect, Network, and Collaborate, Ignite Creativity and Innovation...
        </h5>

        <div className='w-full h-px bg-gray-300 mt-3 lg:mt-7' />
      </div>
      <div className='flex items-center mt-2 lg:mt-4 mb-4 overflow-x-auto'>
        <div className='flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0'>
          {SKILLS?.map(({ name, color, id }) => {
            const isActive = skills?.includes(id)
            return (
              <Button
                key={id}
                className='p-2 lg:text-lg text-xs opacity-60 whitespace-nowrap md:whitespace-normal min-w-fit font-offbit font-bold'
                variant='bordered'
                style={{
                  color: isActive ? 'white' : color,
                  borderColor: color,
                  backgroundColor: isActive ? color : 'transparent',
                  opacity: isActive ? 1 : 0.45,
                }}
                onClick={() => {
                  const newSkillsParams = (
                    isActive
                      ? skills?.filter((skillId) => skillId !== id)
                      : [...skills, id]
                  )
                    .sort((a, b) => a - b)
                    ?.join(',')
                  router.push(
                    pathname +
                      (newSkillsParams?.length
                        ? `?skills=${newSkillsParams}`
                        : '')
                  )
                }}
              >
                {name}
              </Button>
            )
          })}
        </div>
      </div>
      <UserList
        className='grid grid-cols-1 lg:grid-cols-5 gap-y-5 lg:gap-y-10 gap-x-4 lg:gap-x-8 w-full mb-4'
        swr={swr}
      />
    </main>
  )
}
