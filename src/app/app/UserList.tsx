'use client'

import ImageWithFallback from '@/components/ImageWithFallback'
import InfiniteScroll from '@/components/InfiniteScroll'
import { SEARCH_PAGE_SIZE } from '@/constants/app.constants'
import { UserSearchResult } from '@/services/user'
import { findLastNonEmptyUsers } from '@/utils/api'
import { getSkillButtonStyles } from '@/utils/button'
import { getImageOfFirstToken } from '@/utils/de[id]/image'
import { Button, Card, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import { useMemo } from 'react'
import { SWRInfiniteResponse } from 'swr/infinite'

const LoadingSkeleton = ({
  className,
  count = 5,
  swr,
}: {
  className: string
  count: number
  swr: SWRInfiniteResponse<
    { users: UserSearchResult[]; nextPage: number | null },
    any
  >
}) => {
  const lastNonEmptyUsers = findLastNonEmptyUsers(swr)
  // const lastNonEmptyUsersLength = lastNonEmptyUsers?.users?.length || 0
  // console.log('lastNonEmptyUsersLength', lastNonEmptyUsersLength)
  // const hasMorePages =
  //   lastNonEmptyUsers?.nextPage && lastNonEmptyUsersLength < SEARCH_PAGE_SIZE
  return (
    <div className={className}>
      {/* {[...Array(count)].map( */}
      {[...Array(lastNonEmptyUsers?.users?.length ? 1 : count)].map(
        (_, index) => (
          <Card
            key={index}
            className='lg:w-56 w-full space-y-5 p-4 mb-4'
            radius='lg'
          >
            <Skeleton className='rounded-lg'>
              <div className='h-60 rounded-lg bg-default-300'></div>
            </Skeleton>
            <div className='space-y-3'>
              <Skeleton className='w-4/5 rounded-lg'>
                <div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
              </Skeleton>
              <Skeleton className='w-2/5 rounded-lg'>
                <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
              </Skeleton>
            </div>
          </Card>
        )
      )}
    </div>
  )
}

export const UserList = ({
  className,
  swr: swrArg,
}: {
  className: string
  swr: SWRInfiniteResponse<{
    users: UserSearchResult[]
    nextPage: number | null
  }>
}) => {
  const hasAtLeastOneUser = useMemo(
    () => swrArg?.data?.[0]?.users?.length! > 0,
    [swrArg?.data]
  )

  return (
    <div className={className}>
      <InfiniteScroll
        swr={swrArg}
        loadingIndicator={
          <LoadingSkeleton className={className} count={5} swr={swrArg} />
        }
        endingIndicator={
          hasAtLeastOneUser ? null : (
            <div className='text-center'>
              No users found, invite your friends!
            </div>
          )
        }
        isReachingEnd={(
          swr: SWRInfiniteResponse<{
            users: UserSearchResult[]
            nextPage: number | null
          }>
        ) => {
          const lastNonEmptyUsers = findLastNonEmptyUsers(swr)

          const isEmpty = swr?.data?.[0]?.users?.length === 0
          const isLastPage =
            lastNonEmptyUsers?.users?.length! > 0 &&
            lastNonEmptyUsers?.users?.length! < SEARCH_PAGE_SIZE

          if (isEmpty || isLastPage) {
            return true
          }
          return false
        }}
      >
        {(response) =>
          response?.users?.map((user: any) => {
            if (user?.socials?.twitterHandle && user?.name) {
              return (
                <Link
                  href={`/${user?.socials?.twitterHandle}`}
                  className='grid grid-cols-12 items-center gap-0.5 lg:grid-cols-1 lg:gap-2 w-full lg:w-56 h-full'
                  prefetch={true}
                  key={user?.id}
                >
                  {user?.image && (
                    <div className='w-16 h-16 col-span-3 lg:w-56 lg:h-auto lg:flex lg:justify-center'>
                      <div
                        className='lg:w-56 lg:h-72 px-0.5 py-0.5 rounded-lg'
                        style={{
                          background:
                            'radial-gradient(circle, #0049FF 0%, #01AE6A 20%, #0199FF 40%, #E7B114 62%, #E83847 82%, #6401FF 100%)',
                        }}
                      >
                        <ImageWithFallback
                          fallback={getImageOfFirstToken(user)}
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
                    <div className='flex flex-col justify-between py-2 lg:py-0 flex-grow min-w-0'>
                      <strong className='truncate overflow-hidden text-ellipsis lg:text-base text-sm font-offbit font-bold'>
                        {user?.name}
                      </strong>
                      <p className='truncate overflow-hidden text-ellipsis lg:text-sm text-xs font-argent'>
                        @{user?.socials?.twitterHandle}
                      </p>
                    </div>

                    <div className='h-full flex flex-col justify-center lg:justify-start flex-shrink-0'>
                      <Button
                        className='bg-transparent border-1 border-full-stack lg:text-sm text-xs text-right whitespace-nowrap p-1 lg:p-2.5'
                        style={getSkillButtonStyles(user?.skills[0]?.name)}
                        size='sm'
                      >
                        {user?.skills[0]?.name}
                      </Button>
                    </div>
                  </div>
                </Link>
              )
            }
          })
        }
      </InfiniteScroll>
    </div>
  )
}
