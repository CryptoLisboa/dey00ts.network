'use client'

import { UserMap } from '@/services/user'
import { findLastNonEmptyUsersMap } from '@/utils/api'
import { fetcher } from '@/utils/services'
import { Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

const getKey = (page: number) => `/api/map/users/${page + 1}`

export default function Page() {
  const swr = useSWRInfinite<{
    users: UserMap[]
    nextPage: number | null
  }>(getKey, fetcher, {
    revalidateFirstPage: false,
    parallel: true,
    initialSize: 2,
  })

  const { data, isValidating, isLoading, setSize, size } = swr
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
      {(isLoading || isValidating) && (
        <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]' />
      )}
      <DynamicMapView users={users} />
    </main>
  )
}
