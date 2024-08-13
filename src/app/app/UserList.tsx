// import { Image } from '@nextui-org/react'
// import NextImage from 'next/image'
import { getSkillButtonStyles } from '@/utils/button'
import Image from 'next/image'
import Link from 'next/link'

export const UserList = ({
  users,
  className,
}: {
  users: any
  className: string
}) => {
  return (
    <div className={className}>
      {users?.map((user: any) => {
        if (user?.socials?.twitterHandle && user?.name) {
          return (
            <div key={user?.id} className='flex flex-col lg:gap-2'>
              <Link
                href={`/${user?.socials?.twitterHandle}`}
                className='grid grid-cols-12 items-center gap-0.5 lg:grid-cols-1 lg:gap-2 w-full lg:w-72 h-full'
                prefetch={true}
              >
                {user?.image && (
                  <div className='w-16 h-16 col-span-3 lg:w-72 lg:h-auto lg:flex lg:justify-center'>
                    <div className='lg:w-72 lg:h-72'>
                      <Image
                        className='rounded-lg w-full h-full object-cover'
                        src={
                          user?.image ||
                          'https://pbs.twimg.com/profile_images/1821304671081738240/qeI3FyEi_400x400.jpg'
                        }
                        width={128}
                        height={128}
                        alt={`${user?.name}`}
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                <div className='flex lg:flex-row lg:justify-between lg:w-full items-center col-span-9 h-full gap-x-2'>
                  <div className='flex flex-col justify-between py-2 lg:py-0'>
                    <strong className='text-wrap overflow-clip text-ellipsis lg:text-sm text-xs'>
                      {user?.name}
                    </strong>
                    <p className='text-wrap overflow-clip text-ellipsis lg:text-sm text-xs'>
                      @{user?.socials?.twitterHandle}
                    </p>
                  </div>

                  <div
                    className='text-wrap overflow-clip text-ellipsis lg:text-sm text-xs text-right h-full'
                    style={getSkillButtonStyles(user?.skills[0]?.name)}
                  >
                    {user?.skills[0]?.name}
                  </div>
                </div>
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}