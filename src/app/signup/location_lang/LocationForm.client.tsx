'use client'

import { languages, locations } from '@/constants/signup.constants'
import AuthContext from '@/providers/AuthContext'
import { Select, SelectItem } from '@nextui-org/react'
import { useContext } from 'react'

export const LocationForm = () => {
  const { setSignupData, signupData } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    })
  }

  return (
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
          onChange={(e: any) => handleChange(e)}
        >
          {languages.map((language) => (
            <SelectItem key={language.name} value={language.name}>
              {language.name}
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
          classNames={{
            base: 'text-[#AFE5FF]',
            value: 'text-[#AFE5FF]',
            popoverContent: 'text-[#AFE5FF] bg-[#111111]',
            trigger: 'border-[#AFE5FF]',
          }}
          onChange={(e: any) => handleChange(e)}
        >
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
