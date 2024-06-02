import {
  DEGODS_BASE_URL,
  DEGODSMAPPER,
  degodsTraitOrder,
} from '@/constants/degodsMapper'
import { useAutoAnimate } from '@formkit/auto-animate/react'
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

const getValueForTraitAndSubTrait = (
  selectedTrait: any,
  selectedSubTrait: any,
  selectedSubTraitValue: any
) =>
  path([selectedTrait, selectedSubTrait, selectedSubTraitValue], DEGODSMAPPER)

type DegodsSingleViewProps = {
  selectedTrait: string
  setSelectedTrait: (value: string) => void
  setSelectedSubTrait: (value: string) => void
  traits: string[]
  selectedSubTrait: string | number
  setSelectedSubTraitValue: (value: string) => void
  setSelectedTraits: (value: any) => void
  selectedSubTraitValue: string | number
  selectedTraits: any
  handleDownload: () => void
}
export const DegodsSingleView = ({
  selectedTrait,
  setSelectedTrait,
  setSelectedSubTrait,
  traits,
  selectedSubTrait,
  setSelectedSubTraitValue,
  setSelectedTraits,
  selectedSubTraitValue,
  selectedTraits,
  handleDownload,
}: DegodsSingleViewProps) => {
  const [animationParent] = useAutoAnimate()

  const handleLeftClick = () => {
    // @ts-expect-error
    const currentSubTraits = keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])
    const currentIndex = currentSubTraits.indexOf(
      selectedSubTraitValue as never
    )
    const nextIndex = currentIndex - 1
    if (nextIndex >= 0) {
      // @ts-expect-error
      setSelectedSubTraitValue(currentSubTraits[nextIndex])
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: {
          value: currentSubTraits[nextIndex],
          key: selectedSubTrait,
        },
      }))
    } else {
      // @ts-expect-error
      setSelectedSubTraitValue(currentSubTraits[currentSubTraits.length - 1]) // Cycle back to the last item
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: {
          value: currentSubTraits[currentSubTraits.length - 1],
          key: selectedSubTrait,
        },
      }))
    }
  }

  const handleRightClick = () => {
    // @ts-expect-error
    const currentSubTraits = keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])
    const currentIndex = currentSubTraits.indexOf(
      selectedSubTraitValue as never
    )
    const nextIndex = currentIndex + 1
    if (nextIndex < currentSubTraits.length) {
      // @ts-expect-error
      setSelectedSubTraitValue(currentSubTraits[nextIndex])
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: {
          value: currentSubTraits[nextIndex],
          key: selectedSubTrait,
        },
      }))
    } else {
      // @ts-expect-error
      setSelectedSubTraitValue(currentSubTraits[0]) // Cycle back to the first item
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: {
          value: currentSubTraits[0],
          key: selectedSubTrait,
        },
      }))
    }
  }

  // @ts-expect-error
  const a = DEGODS_BASE_URL[selectedTrait]
  const b = getValueForTraitAndSubTrait(
    selectedTrait,
    selectedSubTrait,
    selectedSubTraitValue
  )?.replace(`${selectedTrait}`, '')

  const renderedTraitImage = `${a}/${b}`
  return (
    <>
      <div className='flex gap-1 justify-center'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>{selectedTrait}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Yoots trait dropdown'
            selectionMode='single'
            selectedKeys={[selectedTrait]}
            onAction={(key) => {
              setSelectedTrait(
                key as
                  | 'Backgrounds'
                  | 'Clothes'
                  | 'Eyes'
                  | 'Head'
                  | 'Mouth'
                  | 'Neck'
                  | 'Skins'
                  | 'Specialty'
              )
              setSelectedSubTrait(
                keys(
                  DEGODSMAPPER[
                    key as
                      | 'Backgrounds'
                      | 'Clothes'
                      | 'Eyes'
                      | 'Head'
                      | 'Mouth'
                      | 'Neck'
                      | 'Skins'
                      | 'Specialty'
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
              // @ts-expect-error
              setSelectedSubTrait(key)
              setSelectedSubTraitValue(
                // @ts-expect-error
                keys(DEGODSMAPPER[selectedTrait][key])[0]
              )
            }}
          >
            {
              // @ts-expect-error
              keys(DEGODSMAPPER[selectedTrait])?.map((subtrait) => (
                // @ts-expect-error
                <DropdownItem key={subtrait}>{subtrait}</DropdownItem>
              ))
            }
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered'>{selectedSubTraitValue}</Button>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode='single'
            selectedKeys={[String(selectedSubTraitValue)]}
            aria-label='Action event example'
            onAction={(key) => {
              // @ts-expect-error
              setSelectedSubTraitValue(key)
              setSelectedTraits((prev: any) => ({
                ...prev,
                [selectedTrait]: { value: key, key: selectedSubTrait },
              }))
            }}
          >
            {
              // @ts-expect-error
              keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])?.map(
                (subtrait) => (
                  // @ts-expect-error
                  <DropdownItem key={subtrait}>{subtrait}</DropdownItem>
                )
              )
            }
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
            src={renderedTraitImage}
            alt='Skin Builder'
            width={220}
            height={220}
            unoptimized
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
            <div className='relative w-80 h-80' ref={animationParent}>
              {degodsTraitOrder.map((trait) => {
                // @ts-expect-error
                const src = `${DEGODS_BASE_URL[trait]}/${
                  selectedTraits[trait].key
                }/${selectedTraits[trait].value?.replace(/#/g, '%23')}.png`
                if (src.includes('undefined' || 'null')) return null

                return (
                  <NextImage
                    key={src}
                    src={src}
                    alt={selectedTraits[trait].value}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center max-w-[320px]'
                  />
                )
              })}
            </div>
          </div>
          <div className='w-full'>
            <Button
              onClick={handleDownload}
              className='mt-3 w-full'
              color={'primary'}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
