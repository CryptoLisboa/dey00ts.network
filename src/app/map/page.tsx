'use client'

import { UserMap } from '@/services/user'
import { findLastNonEmptyUsers, findLastNonEmptyUsersMap } from '@/utils/api'
// import { useUsersMap } from '@/hooks/useUserData'
import { fetcher } from '@/utils/services'
import {
  CityApi,
  Collection,
  CountryApi,
  Language,
  Location,
  Socials,
  StateApi,
  Token,
  User,
} from '@prisma/client'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

export default function Page() {
  const swr = useSWRInfinite<{
    users: UserMap[]
    nextPage: number | null
  }>((page) => `/api/map/users/${page + 1}`, {
    fetcher,
    dedupingInterval: 600000,
    refreshInterval: 600000,
    focusThrottleInterval: 600000,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
  })

  const { data, isLoading, isValidating, setSize, size } = swr
  const [pagesQueried, setPagesQueried] = useState<number[]>([])

  useEffect(() => {
    if (data) {
      const lastNonEmptyUsers = findLastNonEmptyUsersMap(data)
      const nextPage = lastNonEmptyUsers?.nextPage
      const hasNextPage = !isNaN(nextPage!)
      if (!isValidating && hasNextPage) {
        if (size + 1 === nextPage && !pagesQueried.includes(nextPage)) {
          setPagesQueried((pages) => [...pages, nextPage])
          setSize(size + 1)
        }
      }
    }
  }, [data, isValidating, setSize, size, pagesQueried])

  // const { data: dataUsers } = useUsersMap()

  const users = useMemo(() => {
    return data?.flatMap((page) => page?.users) || []
  }, [data])

  return (
    <main
      className='dark flex flex-col gap-y-3 w-full h-[85vh] relative'
      id='map'
    >
      <DynamicMapView users={users} />
    </main>
  )
}
