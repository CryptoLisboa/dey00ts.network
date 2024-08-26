'use client'

import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Progress, Select, SelectItem, Spinner } from '@nextui-org/react'
import { useToast } from 'rc-toastr'
import { useEffect, useMemo, useState } from 'react'
import { languages } from '@/constants/signup.constants'
import { useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'
import { ROUTING } from '@/constants/routing.contants'
import { useCountries, useCountry, useCountryState } from '@/hooks/useMapData'
import { Language, Location, User } from '@prisma/client'
import { fetcher } from '@/utils/services'

export default function LocationSignUp() {
  const router = useRouter()
  const { toast } = useToast()

  const { data: user } = useSWR<
    User & { languages: Language[]; location: Location }
  >('/api/user', fetcher)

  const { data: countriesData, isLoading: countriesLoading } = useCountries()
  const countries = useMemo(() => countriesData || [], [countriesData])
  // const [countries, setCountries] = useState<CountryApi[]>([])

  const [languagesValues, setLanguagesValues] = useState<Set<string>>(
    new Set([])
  )

  const [selectedCountry, setSelectedCountry] = useState<Set<string>>(
    new Set([])
  )
  const { data: country } = useCountry(Array.from(selectedCountry)?.[0])
  const countryStates = useMemo(() => country?.states || [], [country])
  useEffect(() => {
    if (countries) {
      const hasValidLocationValue = countries.find(
        (countryInstance) =>
          countryInstance?.externalCountryId ===
          user?.location?.externalCountryId
      )
      if (hasValidLocationValue) {
        setSelectedCountry(
          new Set([hasValidLocationValue?.externalCountryId.toString()])
        )
      }
    }
  }, [user?.location?.externalCountryId, countries])

  const [selectedState, setSelectedState] = useState<Set<string>>(new Set([]))
  useEffect(() => {
    if (countryStates) {
      const hasValidStateValue = countryStates.find(
        (state) => state?.externalStateId === user?.location?.externalStateId
      )
      if (hasValidStateValue) {
        setSelectedState(
          new Set([hasValidStateValue?.externalStateId.toString()])
        )
      }
    }
  }, [user?.location?.externalStateId, countryStates])

  const { data: countryState, isLoading: countryStateLoading } =
    useCountryState(Array.from(selectedState)[0])
  const [selectedCity, setSelectedCity] = useState<Set<string>>(new Set([]))
  const countryCities = useMemo(
    () => countryState?.cities || [],
    [countryState]
  )
  useEffect(() => {
    if (countryState) {
      const hasValidStateValue = countryState?.cities?.find(
        (city) => city?.externalCityId === user?.location?.externalCityId
      )
      if (hasValidStateValue) {
        setSelectedCity(
          new Set([hasValidStateValue?.externalCityId.toString()])
        )
      }
    }
  }, [user?.location?.externalCityId, countryState])

  useEffect(() => {
    const hasValidLanguagesValues = user?.languages?.map((lang) => lang.name)
    if (hasValidLanguagesValues) {
      setLanguagesValues(new Set(hasValidLanguagesValues))
    }
  }, [user?.languages])

  const handleNext = async () => {
    const hasSelectedCountry = selectedCountry.size > 0
    const hasSelectedState = selectedState.size > 0
    const hasSelectedCity = selectedCity.size > 0
    const hasSelectedLanguages = languagesValues.size > 0
    if (!hasSelectedLanguages) {
      toast.error('Please select your language')
    }
    if (!hasSelectedCountry) {
      toast.error('Please select your location')
    }
    if (!hasSelectedState) {
      toast.error('Please select your state')
    }

    const hasValidLocation = hasSelectedCountry && hasSelectedState

    if (hasSelectedLanguages && hasValidLocation) {
      try {
        const externalCountry = countries.find(
          (country) =>
            country.externalCountryId ===
            parseInt(Array.from(selectedCountry)[0])
        )
        const externalState = countryStates.find(
          (state) =>
            state.externalStateId === parseInt(Array.from(selectedState)[0])
        )
        const externalCity = countryCities.find(
          (city) =>
            city.externalCityId === parseInt(Array.from(selectedCity)[0])
        )
        const body = {
          languages: Array.from(languagesValues).map(
            (lang: string) => languages.find((l) => l.name === lang)?.id
          ),
          location: {
            externalCountryId: Number(externalCountry?.externalCountryId),
            externalStateId: Number(externalState?.externalStateId),
            externalCityId: Number(externalCity?.externalCityId),
            countryId: Number(externalCountry?.id),
            stateId: Number(externalState?.id),
            cityId: Number(externalCity?.id),
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
          mutate('/api/user')
          router.push(ROUTING.SIGNUP.SKILLS)
        } else {
          toast.error('Failed to update location')
        }
      } catch (error) {
        toast.error('Failed to update location')
        console.error('error', error)
      }
    }
  }

  return (
    <main className='dark  overflow-hidden' id='location'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/3_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard onClick={handleNext}>
          <div className='text-center grid justify-items-center gap-y-5'>
            <Progress
              size='sm'
              radius='sm'
              classNames={{
                base: 'px-16',
                indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
              }}
              value={(100 / 6) * 2}
            />

            <h1 className='text-2xl font-bold text-white text-center'>
              What&apos;s your language and where do you live?
            </h1>

            <p className='text-base lg:text-xl text-white'>
              This enables us to help you find community members around the
              world.
            </p>

            <div className='grid gap-y-6 w-full px-4 items-center'>
              <div className='grid gap-y-2'>
                <h4 className='text-white text-left'>Language</h4>
                <Select
                  variant='bordered'
                  selectionMode='multiple'
                  placeholder='Select Language'
                  name='languages'
                  classNames={{
                    base: 'text-[#AFE5FF]',
                    value: 'text-[#AFE5FF]',
                    popoverContent: 'text-[#AFE5FF] bg-[#111111]',
                    trigger: 'border-[#AFE5FF]',
                  }}
                  selectedKeys={languagesValues}
                  // @ts-ignore
                  onSelectionChange={setLanguagesValues}
                >
                  {languages?.map((language) => (
                    <SelectItem key={language.name} value={language.name}>
                      {language.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className='grid gap-y-2'>
                <h4 className='text-white text-left'>Country</h4>
                <Select
                  variant='bordered'
                  selectionMode='single'
                  placeholder='Select Country'
                  name='country'
                  classNames={{
                    base: 'text-[#AFE5FF]',
                    value: 'text-[#AFE5FF]',
                    popoverContent: 'text-[#AFE5FF] bg-[#111111]',
                    trigger: 'border-[#AFE5FF]',
                  }}
                  selectedKeys={selectedCountry}
                  // @ts-ignore
                  onSelectionChange={setSelectedCountry}
                  isLoading={countriesLoading}
                  isDisabled={countries?.length === 0 || countriesLoading}
                >
                  {countries.map((country) => (
                    <SelectItem
                      key={country.externalCountryId}
                      value={country.externalCountryId}
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className='grid gap-y-2'>
                <h4 className='text-white text-left'>State</h4>
                <Select
                  variant='bordered'
                  selectionMode='single'
                  placeholder='Select Location'
                  name='location'
                  classNames={{
                    base: 'text-[#AFE5FF]',
                    value: 'text-[#AFE5FF]',
                    popoverContent: 'text-[#AFE5FF] bg-[#111111]',
                    trigger: 'border-[#AFE5FF]',
                  }}
                  selectedKeys={selectedState}
                  // @ts-ignore
                  onSelectionChange={setSelectedState}
                  isDisabled={countryStates?.length === 0 || countriesLoading}
                >
                  {countryStates.map((state) => (
                    <SelectItem
                      key={state?.externalStateId}
                      value={state?.externalStateId}
                    >
                      {state.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className='grid gap-y-2'>
                <h4 className='text-white text-left'>City (optional)</h4>
                <Select
                  variant='bordered'
                  selectionMode='single'
                  placeholder='Select Location'
                  name='location'
                  classNames={{
                    base: 'text-[#AFE5FF]',
                    value: 'text-[#AFE5FF]',
                    popoverContent: 'text-[#AFE5FF] bg-[#111111]',
                    trigger: 'border-[#AFE5FF]',
                  }}
                  selectedKeys={selectedCity}
                  // @ts-ignore
                  onSelectionChange={setSelectedCity}
                  isLoading={countryStateLoading}
                  isDisabled={
                    countryCities?.length === 0 || countryStateLoading
                  }
                >
                  {countryCities.map((city) => (
                    <SelectItem
                      key={city.externalCityId}
                      value={city.externalCityId}
                    >
                      {city.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
