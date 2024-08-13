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
      <div className='flex flex-col items-center mb-4 gap-3'>
        <h1 className='text-2xl font-bold text-white text-center'>
          Find your friends from the DeGods community
        </h1>

        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input
            disabled
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
          {SKILLS?.map(({ name, color, id }) => (
            <Button
              key={id}
              className='p-2 text-lg opacity-60'
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
      <UserList className='flex flex-col gap-3 w-full mb-4' users={users} />

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
