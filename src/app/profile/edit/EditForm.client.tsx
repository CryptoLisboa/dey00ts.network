'use client'

import { languages, locations } from '@/constants/signup.constants'
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from '@nextui-org/react'
import { Language } from '@prisma/client'
import { User } from 'next-auth'
import { useToast } from 'rc-toastr'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const getInitialLocationValue = (locationId: number) => {
  return locations.find((loc) => loc.id === locationId)?.value || ''
}

const getInitialLanguageValue = (locations: Language[]): string[] => {
  return locations
    ?.map((lang) => languages.find((l) => l.id === lang.id)?.value)
    .filter((value) => value !== undefined) as string[]
}

export const EditForm = ({ user }: { user: Partial<User> }) => {
  const { toast } = useToast()

  const {
    data: userData,
    isLoading,
    mutate,
  } = useSWR('/api/user', fetcher, {
    fallbackData: user,
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      location: getInitialLocationValue(userData?.locationId),
      languages: getInitialLanguageValue(userData?.languages),
      bio: userData?.profile?.bio,
    },
  })

  const selectedLocation = watch('location')
  const selectedLanguages = watch('languages')
  const bio = watch('bio')

  useEffect(() => {
    setValue('location', getInitialLocationValue(userData?.locationId))
    setValue('languages', getInitialLanguageValue(userData?.languages || []))
    setValue('bio', userData?.profile?.bio)
  }, [userData])

  const onSubmit = async (data: any) => {
    try {
      debugger
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          languages: data.languages.map(
            (lang: string) => languages.find((l) => l.value === lang)?.id
          ),
        }),
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

  console.log({ selectedLanguages, selectedLocation })
  return (
    <form
      className='container mx-auto h-full px-12 sm:px-24 md:px-32 lg:px-96'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-lg md:text-xl font-lucky text-center mb-3'>
        Edit Profile
        {isLoading && <Spinner className='ml-6' size='sm' />}
      </h1>

      <h2 className='text-md md:text-lg font-lucky text-left mb-3'>
        Update your Location
      </h2>
      <Select
        variant='bordered'
        selectionMode='single'
        placeholder='Select Location'
        name='location'
        className='mb-6'
        selectedKeys={[selectedLocation]}
        onSelectionChange={(e: any) => {
          setValue('location', e.currentKey)
        }}
        classNames={{
          base: 'text-[#AFE5FF]',
          value: 'text-[#AFE5FF]',
          popoverContent: 'text-[#AFE5FF] bg-[#111111]',
          trigger: 'border-[#AFE5FF]',
        }}
      >
        {locations.map((location) => (
          <SelectItem key={location.value} value={location.value}>
            {location.name}
          </SelectItem>
        ))}
      </Select>

      <h2 className='text-md md:text-lg font-lucky text-left mb-3'>
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
            Array.from(e.values()).filter((v) => v !== undefined)
          )
        }}
      >
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.name}
          </SelectItem>
        ))}
      </Select>

      <h2 className='text-md md:text-lg font-lucky text-left mb-3'>
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
      <div className='flex justify-center w-full'>
        <Button type='submit' color='warning' className='w-1/2'>
          Save
          {isSubmitting && <Spinner className='ml-6' size='sm' />}
        </Button>
      </div>
    </form>
  )
}
