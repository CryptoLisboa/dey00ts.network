'use client'

import { languages, locations } from '@/constants/signup.constants'
import { Select, SelectItem } from '@nextui-org/react'

export const LocationForm = () => {
  return (
    <div className='grid gap-y-6 w-full px-4 items-center'>
      <div className='grid gap-y-2'>
        <h4 className='text-white text-left'>Language</h4>
        <Select
          variant='bordered'
          selectionMode='single'
          placeholder='Select Language'
          classNames={{
            base: 'text-[#AFE5FF]',
            value: 'text-[#AFE5FF]',
            popoverContent: 'text-[#AFE5FF] bg-[#111111]',
            trigger: 'border-[#AFE5FF]',
          }}
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
          classNames={{
            base: 'text-[#AFE5FF]',
            value: 'text-[#AFE5FF]',
            popoverContent: 'text-[#AFE5FF] bg-[#111111]',
            trigger: 'border-[#AFE5FF]',
          }}
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
