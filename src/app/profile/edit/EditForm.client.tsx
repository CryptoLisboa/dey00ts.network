'use client'

import { GENDERS, SKILLS } from '@/constants/app.constants'
import { languages, locations } from '@/constants/signup.constants'
import { fetcher } from '@/utils/services'
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from '@nextui-org/react'
import { CityApi, CountryApi, Language, StateApi } from '@prisma/client'
import { User } from 'next-auth'
import { useToast } from 'rc-toastr'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import EditProfileSkeleton from '../EditForm.skeleton'
import {
  useCity,
  useCountries,
  useCountry,
  useCountryState,
} from '@/hooks/useMapData'

const getInitialCountryValue = (
  externalCountryId: string,
  countries: CountryApi[]
) => {
  if (!countries || !countries.find || !externalCountryId) return ''
  return (
    countries
      ?.find(
        (country) => country.externalCountryId === parseInt(externalCountryId)
      )
      ?.externalCountryId.toString() || ''
  )
}

const getInitialStateValue = (
  externalStateId: number,
  states: StateApi[]
): string => {
  if (!states || !states.find || !externalStateId) return ''
  return (
    states
      ?.find((state) => state.externalStateId === externalStateId)
      ?.externalStateId.toString() || ''
  )
}

const getInitialCityValue = (
  externalCityId: string,
  cities: CityApi[]
): string => {
  if (!cities) return ''
  return (
    cities
      ?.find((city) => city.externalCityId === parseInt(externalCityId))
      ?.externalCityId.toString() || ''
  )
}

const getInitialLanguageValue = (locations: Language[]): string[] => {
  return locations
    ?.map((lang) => languages.find((l) => l.id === lang.id)?.value)
    .filter((value) => value !== undefined) as string[]
}

export const EditForm = ({ user }: { user: Partial<User> }) => {
  const { toast } = useToast()

  const { data: countries, isLoading: countriesLoading } = useCountries()

  const {
    data: userData,
    isLoading,
    mutate,
  } = useSWR('/api/user', fetcher, {
    fallbackData: user,
  })

  const [statesLocal, setStatesLocal] = useState<StateApi[]>([])
  const [citiesLocal, setCitiesLocal] = useState<CityApi[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      country: getInitialCountryValue(
        userData?.location?.externalCountryId,
        countries!
      ),
      state: getInitialStateValue(
        userData?.location?.externalStateId,
        statesLocal!
      ),
      city: getInitialCityValue(
        userData?.location?.externalCityId,
        citiesLocal!
      ),
      languages: getInitialLanguageValue(userData?.languages),
      bio: userData?.profile?.bio,
      gender: userData?.genderId,
      skills: userData?.skills?.map((skill: any) => skill.id),
    },
  })

  const selectedCountry = watch('country')
  const selectedState = watch('state')
  const selectedCity = watch('city')
  const selectedLanguages = watch('languages')
  const bio = watch('bio')
  const gender = watch('gender')
  const skills = watch('skills')

  const {
    data: country,
    isLoading: countryLoading,
    mutate: countryMutate,
  } = useCountry(selectedCountry.toString())

  const {
    data: state,
    isLoading: stateLoading,
    mutate: stateMutate,
  } = useCountryState(selectedState.toString())

  const {
    data: city,
    isLoading: cityLoading,
    mutate: cityMutate,
  } = useCity(selectedCity.toString())

  useEffect(() => {
    if (selectedCountry) {
      console.log(
        'selectedCountry',
        selectedCountry,
        'country',
        country,
        'countryLoading',
        countryLoading
      )
      // countryMutate()
    }
  }, [selectedCountry, country, countryLoading])

  const selectedStateMemo = useMemo(() => selectedState, [selectedState])

  useEffect(() => {
    if (selectedStateMemo) {
      console.log('selectedState', selectedStateMemo)
      // stateMutate()
    }
  }, [selectedStateMemo])

  const countryStates = useMemo(() => {
    return country?.states || []
  }, [country?.states])

  useEffect(() => {
    setStatesLocal(countryStates)
    console.log('new statesLocal', countryStates)
  }, [countryStates])

  useEffect(() => {
    setCitiesLocal(state?.cities || [])
    console.log('new citiesLocal', state?.cities)
  }, [state?.cities])

  useEffect(() => {
    setValue(
      'country',
      getInitialCountryValue(userData?.location?.externalCountryId, countries!)
    )
    // setValue(
    //   'state',
    //   getInitialStateValue(userData?.location?.externalStateId, statesLocal!)
    // )
    // setValue(
    //   'city',
    //   getInitialCityValue(userData?.location?.externalCityId, citiesLocal!)
    // )
    setValue('languages', getInitialLanguageValue(userData?.languages || []))
    setValue('bio', userData?.profile?.bio)

    const genderVal = GENDERS.find((g) => g.id === userData?.genderId)?.name
    setValue('gender', genderVal)
    setValue(
      'skills',
      userData?.skills?.map((skill: any) => skill.id)
    )
  }, [userData, countries, state, setValue])

  useEffect(() => {
    setValue(
      'state',
      getInitialStateValue(userData?.location?.externalStateId, statesLocal!)
    )
  }, [statesLocal])

  useEffect(() => {
    setValue(
      'city',
      getInitialCityValue(userData?.location?.externalCityId, citiesLocal!)
    )
  }, [citiesLocal])

  const onSubmit = async (data: any) => {
    try {
      const genderId = GENDERS.find(
        ({ name }) => name.toLowerCase() === gender.toLowerCase()
      )?.id

      const city = citiesLocal.find(
        (c) => c.externalCityId === parseInt(selectedCity)
      )

      const state = statesLocal.find(
        (s) => s.externalStateId === parseInt(selectedState)
      )

      const country = countries?.find(
        (c) => c.externalCountryId === parseInt(selectedCountry)
      )

      debugger

      const body = {
        ...data,
        languages: data.languages.map(
          (lang: string) => languages.find((l) => l.value === lang)?.id
        ),
        gender: genderId,
        location: {
          cityId: city?.id,
          externalCityId: city?.externalCityId,
          stateId: state?.id,
          externalStateId: state?.externalStateId,
          countryId: country?.id,
          externalCountryId: country?.externalCountryId,
        },
      }

      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        toast.success('Profile updated')
        mutate()
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      toast.error('Failed to update profile')
      console.error('error', error)
    }
  }

  const hadNoData = isLoading
  if (hadNoData) {
    return <EditProfileSkeleton />
  }

  return (
    <form
      className='container mx-auto h-full px-12 sm:px-24 md:px-32 lg:px-96'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-lg md:text-xl font-offbit font-bold text-center mb-3'>
        Edit Profile
        {isLoading && <Spinner className='ml-6' size='sm' />}
      </h1>

      <h2 className='text-md md:text-lg font-offbit font-bold text-left mb-3'>
        Update your Country
      </h2>
      {countries && countries.length > 0 && (
        <Select
          variant='bordered'
          selectionMode='single'
          placeholder='Select Country'
          name='country'
          className='mb-6'
          selectedKeys={[selectedCountry]}
          onSelectionChange={(e: any) => {
            setValue('country', e.currentKey)
          }}
          classNames={{
            base: 'text-[#AFE5FF]',
            value: 'text-[#AFE5FF]',
            popoverContent: 'text-[#AFE5FF] bg-[#111111]',
            trigger: 'border-[#AFE5FF]',
          }}
        >
          {(countries || []).map((country) => {
            return (
              <SelectItem
                key={country.externalCountryId.toString()}
                value={country.externalCountryId.toString()}
              >
                {country.name}
              </SelectItem>
            )
          })}
        </Select>
      )}

      <h2 className='text-md md:text-lg font-offbit font-bold text-left mb-3'>
        Update your State
      </h2>
      <Select
        variant='bordered'
        selectionMode='single'
        placeholder='Select State'
        name='state'
        className='mb-6'
        selectedKeys={[selectedState]}
        onSelectionChange={(e: any) => {
          setValue('state', e.currentKey)
        }}
        classNames={{
          base: 'text-[#AFE5FF]',
          value: 'text-[#AFE5FF]',
          popoverContent: 'text-[#AFE5FF] bg-[#111111]',
          trigger: 'border-[#AFE5FF]',
        }}
      >
        {(statesLocal || []).map((stateItr: StateApi) => (
          <SelectItem
            key={stateItr.externalStateId.toString()}
            value={stateItr.externalStateId.toString()}
          >
            {stateItr.name}
          </SelectItem>
        ))}
      </Select>

      <h2 className='text-md md:text-lg font-offbit font-bold text-left mb-3'>
        Update your City
      </h2>
      <Select
        variant='bordered'
        selectionMode='single'
        placeholder='Select City'
        name='city'
        className='mb-6'
        selectedKeys={[selectedCity]}
        onSelectionChange={(e: any) => {
          setValue('city', e.currentKey)
        }}
        classNames={{
          base: 'text-[#AFE5FF]',
          value: 'text-[#AFE5FF]',
          popoverContent: 'text-[#AFE5FF] bg-[#111111]',
          trigger: 'border-[#AFE5FF]',
        }}
      >
        {(citiesLocal || []).map((city: CityApi) => (
          <SelectItem
            key={city.externalCityId.toString()}
            value={city.externalCityId.toString()}
          >
            {city.name}
          </SelectItem>
        ))}
      </Select>

      <h2 className='text-md md:text-lg font-offbit font-bold text-left mb-3'>
        Update your Language
      </h2>

      <Select
        variant='bordered'
        selectionMode='multiple'
        placeholder='Select Language'
        name='languages'
        selectedKeys={selectedLanguages}
        className='mb-6'
        classNames={{
          base: 'text-[#AFE5FF]',
          value: 'text-[#AFE5FF]',
          popoverContent: 'text-[#AFE5FF] bg-[#111111]',
          trigger: 'border-[#AFE5FF]',
        }}
        onSelectionChange={(e: any) => {
          setValue(
            'languages',
            Array.from(e.values()).filter(
              (v) => v !== undefined && v !== null
            ) as string[]
          )
        }}
      >
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.name}
          </SelectItem>
        ))}
      </Select>

      <h2 className='text-md md:text-lg font-offbit font-bold text-left mb-3'>
        Update your Bio
      </h2>
      <Textarea
        key='bordered'
        variant='bordered'
        {...register('bio')}
        value={bio}
        placeholder='type here'
        className='mb-6'
        classNames={{
          base: 'text-[#D9D9D9]',
          innerWrapper: 'p-1',
          input: 'min-h-[100px]',
        }}
        size='lg'
      />

      <RadioGroup
        isRequired
        color='success'
        label='UPDATE GENDER'
        value={gender}
        name='gender'
        onChange={(e) => setValue('gender', e.target.value)}
        classNames={{
          base: 'w-full mb-6',
          wrapper: 'grid grid-cols-1 flex-row gap-y-3',
          label:
            'text-md md:text-lg font-offbit font-bold text-left mb-3 text-white',
        }}
      >
        <Radio color='primary' value='Male'>
          <p className='text-white'>male</p>
        </Radio>
        <Radio color='danger' value='Female'>
          <p className='text-white'>female</p>
        </Radio>
        <Radio color='warning' value='Other'>
          <p className='text-white'>other</p>
        </Radio>
        <Radio color='warning' value='Prefer not to say'>
          <p className='text-white'>prefer not to say</p>
        </Radio>
      </RadioGroup>

      <h2 className='text-md md:text-lg font-offbit font-bold text-left mb-3'>
        Update your Skills
      </h2>
      <div className='flex flex-wrap justify-center gap-4 w-full mb-3'>
        {SKILLS.map(({ id, name, color }) => (
          <Button
            key={id}
            className='p-2 text-lg'
            variant='bordered'
            style={{
              color,
              borderColor: color,
              opacity: skills?.includes(id) ? 1 : 0.66,
            }}
            onClick={() => {
              if (skills?.includes(id)) {
                setValue(
                  'skills',
                  skills?.filter((i: any) => i !== id)
                )
              } else {
                setValue('skills', [...(skills || []), id])
              }
            }}
          >
            {name}
          </Button>
        ))}
      </div>

      <div className='flex justify-center w-full'>
        <Button type='submit' color='warning' className='w-1/2'>
          Save
          {isSubmitting && <Spinner className='ml-6' size='sm' />}
        </Button>
      </div>
    </form>
  )
}
