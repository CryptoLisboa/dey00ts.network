'use client'

import { useUsersMap } from '@/hooks/useUserData'
import { fetcher } from '@/utils/services'
import dynamic from 'next/dynamic'
import useSWRInfinite from 'swr/infinite'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

export default function Page() {
  // const { data } = useUsersMap()
  const { data, isLoading, isValidating, mutate, error } = useSWRInfinite(
    '/api/map/users',
    {
      fetcher,
      dedupingInterval: 600000,
      refreshInterval: 600000,
      focusThrottleInterval: 600000,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    }
  )

  return (
    <main
      className='dark flex flex-col gap-y-3 w-full h-[85vh] relative'
      id='map'
    >
      <DynamicMapView users={data} />
    </main>
  )
}
