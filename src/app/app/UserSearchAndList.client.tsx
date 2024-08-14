'use client'

import { SEARCH_PAGE_SIZE, SkillIds, SKILLS } from '@/constants/app.constants'
import { Button, Image, Input } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { UserList } from './UserList'

type IUserSearchAndListProps = {
  users: any //User[]
  skills: SkillIds[]
  page: number
}
export const UserSearchAndList = ({
  users,
  skills,
  page,
}: IUserSearchAndListProps) => {
  const pathname = usePathname()
  const router = useRouter()

  console.log('users', users)

  return (
    <main className='container pt-0 mx-auto p-4'>
      <div className='flex flex-col items-center mt-10 lg:mt-20 mb-4 gap-3'>
        <h3 className='text-3xl lg:text-6xl font-bold text-white text-center lg:mb-8 mb-4'>
          DeGods Network
        </h3>
        <h3 className='text-lg lg:text-xl font-bold text-white text-center'>
          Connect, Network, and Collaborate, Ignite Creativity and Innovation...
        </h3>

        <div className='w-full h-px bg-gray-300 mt-3 lg:mt-7' />
      </div>
      <div className='flex items-center mt-2 lg:mt-4 mb-4 overflow-x-auto'>
        <div className='flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0'>
          {SKILLS?.map(({ name, color, id }) => (
            <Button
              key={id}
              className='p-2 lg:text-lg text-xs opacity-60 whitespace-nowrap md:whitespace-normal min-w-fit'
              variant='bordered'
              style={{
                color,
                borderColor: color,
                opacity: skills?.includes(id) ? 1 : 0.45,
              }}
              onClick={() => {
                const newSkillsParams = (
                  skills?.includes(id)
                    ? skills?.filter((skillId) => skillId !== id)
                    : [...skills, id]
                )
                  .sort((a, b) => a - b)
                  ?.join(',')
                router.push(pathname + `?page=1&skills=${newSkillsParams}`)
              }}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
      <UserList
        className='grid grid-cols-1 lg:grid-cols-5 gap-y-5 lg:gap-y-10 gap-x-4 lg:gap-x-8 w-full mb-4'
        users={users}
      />

      {/* pagination buttons */}
      <div className='flex justify-center gap-x-4'>
        <Button
          variant='bordered'
          onClick={() => {
            const pagePrevious = Math.max(1, page - 1)
            router.push(pathname + `?page=${pagePrevious}&skills=${skills}`)
          }}
          isDisabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant='bordered'
          onClick={() => {
            const pageNext = page + 1
            router.push(pathname + `?page=${pageNext}&skills=${skills}`)
          }}
          isDisabled={users?.length < SEARCH_PAGE_SIZE}
        >
          Next
        </Button>
      </div>
    </main>
  )
}
