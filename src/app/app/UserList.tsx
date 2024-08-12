import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
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
            <div
              key={user?.id}
              className='flex w-full items-center justify-between h-16'
            >
              <Link
                href={`/${user?.socials?.twitterHandle}`}
                className='flex items-center gap-1 w-full h-full'
                prefetch={true}
              >
                {user?.image && (
                  <Image
                    as={NextImage}
                    className='rounded-lg'
                    src={user?.image}
                    width={64}
                    height={64}
                    alt='avatar'
                    unoptimized
                  />
                )}

                <div className='flex flex-col h-full justify-between py-2'>
                  <strong
                    style={{
                      color: `var(--color-${user?.skills[0]?.name
                        .toLowerCase()
                        .replace(/ /g, '-')})`,
                      borderColor: `var(--color-${user?.skills[0]?.name
                        .toLowerCase()
                        .replace(/ /g, '-')})`,
                    }}
                  >
                    {user?.skills[0]?.name}
                  </strong>
                  <p>@{user?.socials?.twitterHandle}</p>
                </div>

                {!!user?.location?.name && (
                  <div className='flex ml-auto pr-3 text-right'>
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
