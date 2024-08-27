import { UserMap, UserSearchResult } from '@/services/user'
import { SWRInfiniteResponse } from 'swr/infinite'

export function findLastNonEmptyUsers(
  response: SWRInfiniteResponse<{
    users: UserSearchResult[]
    nextPage: number | null
  }>
): {
  users: UserSearchResult[]
  nextPage: number | null
} | null {
  const data = response?.data
  // Iterate the array from the last element to the first
  for (let i = (data?.length || 0) - 1; data && i >= 0; i--) {
    // Check if the current element has a non-empty 'users' array
    if (data?.[i]?.users && data?.[i]?.users?.length > 0) {
      // Return the last element where 'users' is not empty
      const users = data[i]?.users
      const nextPage = data[i]?.nextPage
      return { users, nextPage }
    }
  }
  // Return null if no non-empty 'users' array is found
  return null
}

export function findLastNonEmptyUsersMap(
  data:
    | {
        users: UserMap[]
        nextPage: number | null
      }[]
    | undefined
): {
  users: UserMap[]
  nextPage: number | null
} | null {
  // const data = response?.data
  // Iterate the array from the last element to the first
  for (let i = (data?.length || 0) - 1; data && i >= 0; i--) {
    // Check if the current element has a non-empty 'users' array
    if (data?.[i]?.users && data?.[i]?.users?.length > 0) {
      // Return the last element where 'users' is not empty
      const users = data[i]?.users
      const nextPage = data[i]?.nextPage
      return { users, nextPage }
    }
  }
  // Return null if no non-empty 'users' array is found
  return null
}
