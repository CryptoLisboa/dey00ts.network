import { UserSearchResult } from '@/services/user'
import { fetcher } from '@/utils/services'
import useSWR from 'swr'

export function useUserSearchList(page: number, skills: number[]) {
  const { data, isLoading, mutate, isValidating } = useSWR<UserSearchResult[]>(
    `/api/user/search?page=${page}&skills=${skills}`,
    fetcher
  )

  return {
    data,
    isLoading,
    mutate,
    isValidating,
  }
}
