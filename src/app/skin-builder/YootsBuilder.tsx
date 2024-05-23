'use client'
import { YOOTSMAPPER } from '@/constants/yootsMapper'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import NextImage from 'next/image'
import { keys, path } from 'ramda'
import { Key, useState } from 'react'

const getValueForTraitAndSubTrait = (
  selectedTrait: any,
  selectedSubTrait: any
) => path([selectedTrait, selectedSubTrait], YOOTSMAPPER)

const BASE_URL = 'https://bafybeihu3veecxn5bscv3jrenittgviqkbe4epek6poggozbbdsx2vm6jy.ipfs.dweb.link'

export const YootsBuilder = () => {
  const traits = keys(YOOTSMAPPER)

  const [selectedTraits, setSelectedTraits] = useState(() => {
    return traits.reduce((acc: any, trait) => {
      acc[trait] = keys(YOOTSMAPPER[trait])[0]
      return acc
    }, {})
  })

  console.log({
    selectedTraits,
    a: selectedTraits[0],
    test: selectedTraits['Background'],
  })

  const [selectedTrait, setSelectedTrait] = useState(traits[0])
  const [selectedSubTrait, setSelectedSubTrait] = useState<Key>(
    keys(YOOTSMAPPER[selectedTrait])[0]
  )

  return (
    <>
      <div className='flex gap-1 justify-center'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>{selectedTrait}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Action event example'
            selectionMode='single'
            selectedKeys={[selectedTrait]}
            onAction={(key) => {
              setSelectedTrait(
                key as 'Background' | 'Clothes' | 'Eyes' | 'Head' | 'Skins'
              )
              setSelectedSubTrait(
                keys(
                  YOOTSMAPPER[
                    key as 'Background' | 'Clothes' | 'Eyes' | 'Head' | 'Skins'
                  ]
                )[0]
              )
              console.log(
                keys(
                  YOOTSMAPPER[
                    key as 'Background' | 'Clothes' | 'Eyes' | 'Head' | 'Skins'
                  ]
                )[0]
              )
            }}
          >
            {traits?.map((trait) => (
              <DropdownItem key={trait}>{trait}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>{selectedSubTrait}</Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode='single'
            selectedKeys={[String(selectedSubTrait)]}
            aria-label='Action event example'
            onAction={(key) => {
              setSelectedSubTrait(key)
              setSelectedTraits((prev: any) => ({
                ...prev,
                [selectedTrait]: key,
              }))
            }}
          >
            {keys(YOOTSMAPPER[selectedTrait])?.map((subtrait) => (
              <DropdownItem key={subtrait}>{subtrait}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className='flex mt-3 justify-center items-center'>
        <button className='mr-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
            />
          </svg>
        </button>
        <Image
          className='border-1 border-gray-400'
          as={NextImage}
          src={`${BASE_URL}/${getValueForTraitAndSubTrait(
            selectedTrait,
            selectedSubTrait
          )}`}
          alt='Skin Builder'
          width={220}
          height={220}
        />
        <button className='ml-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
        </button>
      </div>

      {/* <div className="flex mt-3 justify-center">
        <Image
          className="border-1 border-gray-400"
          as={NextImage}
          src="/temp/download.png"
          alt="Skin Builder"
          width={220}
          height={220}
        />
      </div> */}
      <div className='block mt-3 justify-center'>
        <div className='h-96 grid items-center justify-center w-full relative mt-4'>
          <NextImage
            src={`${BASE_URL}/Background/${selectedTraits[
              'Background'
            ].replace(/#/g, '%23')}.png`}
            alt={`background-${selectedTraits['Background'].replace(
              /#/g,
              '%23'
            )}`}
            width={324}
            height={324}
            className='absolute inset-0 rounded-lg justify-self-center'
          />
          <NextImage
            src={`${BASE_URL}/Skins/${selectedTraits['Skins'].replace(
              /#/g,
              '%23'
            )}.png`}
            alt='skin'
            width={324}
            height={324}
            className='absolute inset-0 rounded-lg justify-self-center'
          />
          <NextImage
            src={`${BASE_URL}/Clothes/${selectedTraits['Clothes'].replace(
              /#/g,
              '%23'
            )}.png`}
            alt='skin'
            width={324}
            height={324}
            className='absolute inset-0 rounded-lg justify-self-center'
          />
          <NextImage
            src={`${BASE_URL}/Head/${selectedTraits['Head'].replace(
              /#/g,
              '%23'
            )}.png`}
            alt='eyes'
            width={324}
            height={324}
            className='absolute inset-0 rounded-lg justify-self-center'
          />
          <NextImage
            src={`${BASE_URL}/Eyes/${selectedTraits['Eyes'].replace(
              /#/g,
              '%23'
            )}.png`}
            alt='eyes'
            width={324}
            height={324}
            className='absolute inset-0 rounded-lg justify-self-center'
          />
        </div>
      </div>
    </>
  )
}
