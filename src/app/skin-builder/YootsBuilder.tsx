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

const BASE_URL =
  'https://bafybeihu3veecxn5bscv3jrenittgviqkbe4epek6poggozbbdsx2vm6jy.ipfs.dweb.link'

export const YootsBuilder = () => {
  const traits = keys(YOOTSMAPPER)

  const [selectedTraits, setSelectedTraits] = useState(() => {
    return traits.reduce((acc: any, trait) => {
      acc[trait] = keys(YOOTSMAPPER[trait])[0]
      return acc
    }, {})
  })

  const [selectedTrait, setSelectedTrait] = useState(traits[0])
  const [selectedSubTrait, setSelectedSubTrait] = useState<Key>(
    keys(YOOTSMAPPER[selectedTrait])[0]
  )

  const formatDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`
  }
  const handleLeftClick = () => {
    const currentSubTraits = keys(YOOTSMAPPER[selectedTrait])
    const currentIndex = currentSubTraits.indexOf(selectedSubTrait as never)
    const nextIndex = currentIndex - 1
    if (nextIndex >= 0) {
      setSelectedSubTrait(currentSubTraits[nextIndex])
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: currentSubTraits[nextIndex],
      }))
    } else {
      setSelectedSubTrait(currentSubTraits[currentSubTraits.length - 1]) // Cycle back to the last item
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: currentSubTraits[currentSubTraits.length - 1],
      }))
    }
  }

  const handleRightClick = () => {
    const currentSubTraits = keys(YOOTSMAPPER[selectedTrait])
    const currentIndex = currentSubTraits.indexOf(selectedSubTrait as never)
    const nextIndex = currentIndex + 1
    if (nextIndex < currentSubTraits.length) {
      setSelectedSubTrait(currentSubTraits[nextIndex])
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: currentSubTraits[nextIndex],
      }))
    } else {
      setSelectedSubTrait(currentSubTraits[0]) // Cycle back to the first item
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: currentSubTraits[0],
      }))
    }
  }

  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return
    canvas.width = 3000
    canvas.height = 3000

    const images = [
      `${BASE_URL}/Background/${selectedTraits['Background'].replace(
        /#/g,
        '%23'
      )}.png`,
      `${BASE_URL}/Skins/${selectedTraits['Skins'].replace(/#/g, '%23')}.png`,
      `${BASE_URL}/Clothes/${selectedTraits['Clothes'].replace(
        /#/g,
        '%23'
      )}.png`,
      `${BASE_URL}/Eyes/${selectedTraits['Eyes'].replace(/#/g, '%23')}.png`,
      `${BASE_URL}/Head/${selectedTraits['Head'].replace(/#/g, '%23')}.png`,
    ]

    Promise.all(images.map((src) => loadImage(src)))
      .then((loadedImages) => {
        loadedImages.forEach((img) => {
          context.drawImage(img, 0, 0, 3000, 3000)
        })
        const dataURL = canvas.toDataURL('image/png')
        downloadImage(dataURL, 'y00t - ' + formatDate() + '.png')
      })
      .catch((err) => {
        console.error('Failed to load images', err)
      })
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = 'anonymous' // to handle CORS issues
      img.src = src
      img.onload = () => resolve(img)
      img.onerror = (err) => reject(err)
    })
  }

  const downloadImage = (dataURL: string, filename: string) => {
    const link = document.createElement('a')
    link.href = dataURL
    link.download = filename
    link.click()
  }

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

      <div className='flex flex-col md:flex-row justify-center gap-6'>
        <div className='flex mt-3 justify-center items-center'>
          <button className='mr-3' onClick={handleLeftClick}>
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
          <button className='ml-3' onClick={handleRightClick}>
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

        <div className='block mt-3 justify-center'>
          <div className='h-96 grid items-center justify-center w-full relative mt-4'>
            <div className='relative w-80 h-80'>
              <NextImage
                src={`${BASE_URL}/Background/${selectedTraits[
                  'Background'
                ].replace(/#/g, '%23')}.png`}
                alt={`background-${selectedTraits['Background'].replace(
                  /#/g,
                  '%23'
                )}`}
                width={320}
                height={320}
                className='absolute inset-0 rounded-lg justify-self-center'
              />
              <NextImage
                src={`${BASE_URL}/Skins/${selectedTraits['Skins'].replace(
                  /#/g,
                  '%23'
                )}.png`}
                alt='skin'
                width={320}
                height={320}
                className='absolute inset-0 rounded-lg justify-self-center'
              />
              <NextImage
                src={`${BASE_URL}/Clothes/${selectedTraits['Clothes'].replace(
                  /#/g,
                  '%23'
                )}.png`}
                alt='skin'
                width={320}
                height={320}
                className='absolute inset-0 rounded-lg justify-self-center'
              />
              <NextImage
                src={`${BASE_URL}/Eyes/${selectedTraits['Eyes'].replace(
                  /#/g,
                  '%23'
                )}.png`}
                alt='eyes'
                width={320}
                height={320}
                className='absolute inset-0 rounded-lg justify-self-center'
              />
              <NextImage
                src={`${BASE_URL}/Head/${selectedTraits['Head'].replace(
                  /#/g,
                  '%23'
                )}.png`}
                alt='eyes'
                width={320}
                height={320}
                className='absolute inset-0 rounded-lg justify-self-center'
              />
            </div>
          </div>
          <Button onClick={handleDownload} className='mt-3'>
            Download
          </Button>
        </div>
      </div>
    </>
  )
}
