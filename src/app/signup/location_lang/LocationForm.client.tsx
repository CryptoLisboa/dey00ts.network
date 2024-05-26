'use client'

import { languages, locations } from '@/constants/signup.constants'
import { SignUpContext } from '@/providers/SignUpProvider'
import { Select, SelectItem } from '@nextui-org/react'
import { useContext } from 'react'
// import { useSignUp } from '../../../../providers/SignUpProvider'

export const LocationForm = () => {
  // const { userDetails, updateUserDetails, nextStep } = useSignUp()
  const data = useContext(SignUpContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    data?.updateUserDetails({ [e.target.name]: e.target.value })
  }
  console.log({ data })
  return (
    <div className='grid gap-y-6 w-full px-4 items-center'>
      <div className='grid gap-y-2'>
        <h4 className='text-white text-left'>Language</h4>
        <Select
          variant='bordered'
          selectionMode='single'
          placeholder='Select Language'
          name='language'
          value={data?.userDetails?.language}
          classNames={{
            base: 'text-[#AFE5FF]',
            value: 'text-[#AFE5FF]',
            popoverContent: 'text-[#AFE5FF] bg-[#111111]',
            trigger: 'border-[#AFE5FF]',
          }}
          onChange={(e: any) => handleChange(e)}
          // onSelect={(e) => handleChange(e)}
        >
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className='grid gap-y-2'>
        <h4 className='text-white text-left'>Location</h4>
        <Select
          variant='bordered'
          selectionMode='single'
          placeholder='Select Location'
          name='location'
          value={data?.userDetails?.location}
          classNames={{
            base: 'text-[#AFE5FF]',
            value: 'text-[#AFE5FF]',
            popoverContent: 'text-[#AFE5FF] bg-[#111111]',
            trigger: 'border-[#AFE5FF]',
          }}
          onChange={(e: any) => handleChange(e)}
          // onSelect={(e) => handleChange(e)}
        >
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
