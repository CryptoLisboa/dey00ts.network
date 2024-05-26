// @ts-nocheck
import {
  YOOTS_BASE_URL,
  YOOTSMAPPER,
  yootsTraitOrder,
} from '@/constants/yootsMapper'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import { keys, path } from 'ramda'
import NextImage from 'next/image'
type YootsSingleViewProps = {
  selectedTrait: string
  setSelectedTrait: (value: string) => void
  setSelectedSubTrait: (value: string) => void
  traits: string[]
  selectedSubTrait: string
  setSelectedTraits: (value: any) => void
  selectedTraits: any
  handleLeftClick: () => void
  handleRightClick: () => void
  handleDownload: () => void
}
const getValueForTraitAndSubTrait = (
  selectedTrait: any,
  selectedSubTrait: any
) => path([selectedTrait, selectedSubTrait], YOOTSMAPPER)

export function YootsSingleView({
  selectedTrait,
  setSelectedTrait,
  setSelectedSubTrait,
  traits,
  selectedSubTrait,
  setSelectedTraits,
  selectedTraits,
  handleDownload,
}: YootsSingleViewProps) {
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
            src={`${YOOTS_BASE_URL}/${getValueForTraitAndSubTrait(
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
              {yootsTraitOrder.map((trait) => {
                const val = selectedTraits[trait]
                if (!val) return null
                const src = `${YOOTS_BASE_URL}/${trait}/${val.replace(
                  /#/g,
                  '%23'
                )}.png`

                if (src.includes('undefined' || 'null')) return null
                return (
                  <NextImage
                    key={src}
                    src={src}
                    alt={`${trait.toLowerCase()}-${selectedTraits[
                      trait
                    ].replace(/#/g, '%23')}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                )
              })}
            </div>
          </div>
          <div className='w-96'>
            <Button onClick={handleDownload} className='mt-3 w-full'>
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
