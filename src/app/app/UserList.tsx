// import { Image } from '@nextui-org/react'
// import NextImage from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

const getSkillStyles = (skillName: string) => {
  const formattedSkillName = skillName.toLowerCase().replace(/ /g, '-')
  return {
    color: `var(--color-${formattedSkillName})`,
    borderColor: `var(--color-${formattedSkillName})`,
  }
}

export const UserList = ({
  users,
  className,
}: {
  users: any
  className: string
}) => {
  return (
    <div
      // className={className}
      className='grid grid-cols-1 lg:grid-cols-2 gap-3 w-full mb-4'
    >
      {users?.map((user: any) => {
        if (user?.socials?.twitterHandle && user?.name) {
          return (
            <div
              key={user?.id}
              className='flex w-full items-center justify-between h-16'
            >
              <Link
                href={`/${user?.socials?.twitterHandle}`}
                className='grid grid-cols-12 items-center gap-0.5 lg:gap-1 w-full h-full'
                prefetch={true}
              >
                {user?.image && (
                  <div className='w-16 h-full bg-blue-200 col-span-3'>
                    <Image
                      className='rounded-lg'
                      src='https://pbs.twimg.com/profile_images/1821304671081738240/qeI3FyEi_400x400.jpg'
                      width={64}
                      height={64}
                      alt='avatar'
                      unoptimized
                    />
                  </div>
                )}

                <div className='flex flex-col h-full justify-between py-2 col-span-6 lg:text-base text-sm'>
                  <strong style={getSkillStyles(user?.skills[0]?.name)}>
                    {user?.skills[0]?.name}
                  </strong>
                  <p>@{user?.socials?.twitterHandle}</p>
                </div>

                {!!user?.location?.name && (
                  <div className='text-wrap overflow-clip text-ellipsis h-full col-span-3 lg:text-base text-sm flex flex-col justify-end py-2'>
                    {user?.location?.name}
                  </div>
                )}
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}
