import { UserSearchResult } from '@/services/user'
import { fetcher } from '@/utils/services'
import useSWR from 'swr'

export function useUserSearchList(page: number, skills: number[]) {
  const { data, isLoading, mutate, isValidating, error } = useSWR<{
    users: UserSearchResult[]
    nextPage: number | null
  }>(`/api/user/search?page=${page}&skills=${skills}`, fetcher, {
    dedupingInterval: 600000,
    refreshInterval: 600000,
    focusThrottleInterval: 600000,
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
  })

  let nextPage = data?.nextPage

  return {
    data: data?.users,
    isLoading,
    mutate,
    isValidating,
    error,
    nextPage,
  }
}

export function useUsersMap() {
  const { data, isLoading, isValidating, mutate, error } = useSWR(
    '/api/map/users',
    fetcher,
    {
      dedupingInterval: 600000,
      refreshInterval: 600000,
      focusThrottleInterval: 600000,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    }
  )

  return {
    data,
    isLoading,
    isValidating,
    mutate,
    error,
  }
}
