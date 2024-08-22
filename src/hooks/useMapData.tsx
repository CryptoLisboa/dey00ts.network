'use client'

import { fetcher } from '@/utils/services'
import { CityApi, CountryApi, StateApi } from '@prisma/client'
import useSWR from 'swr'

export const useCountries = () => {
  const { data, error, isLoading, isValidating } = useSWR<CountryApi[]>(
    '/api/map/country',
    fetcher,
    {
      dedupingInterval: 600000,
      refreshInterval: 600000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  )
  return { data, error, isLoading, isValidating }
}

type Country = CountryApi & {
  states: StateApi[]
}

export const useCountry = (externalCountryId: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Country>(
    externalCountryId ? `/api/map/country/${externalCountryId}` : null,
    fetcher
  )
  return { data, error, isLoading, isValidating, mutate }
}

export const useCountryState = (externalStateId: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    StateApi & { cities: CityApi[] }
  >(externalStateId ? `/api/map/state/${externalStateId}` : null, fetcher)
  return { data, error, isLoading, isValidating, mutate }
}

export const useCity = (externalCityId: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<CityApi>(
    externalCityId ? `/api/map/city/${externalCityId}` : null,
    fetcher
  )
  return { data, error, isLoading, isValidating, mutate }
}
