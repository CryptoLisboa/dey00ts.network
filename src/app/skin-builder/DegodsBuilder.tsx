// @ts-nocheck
import { DEGODS_BASE_URL, DEGODSMAPPER } from '@/constants/degodsMapper'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  useDisclosure,
} from '@nextui-org/react'
import NextImage from 'next/image'
import { keys, path } from 'ramda'
import { useState } from 'react'
import { DisplaySingleTrait } from './DisplaySingleTrait'
import { TraitModal } from './TraitModal'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const getValueForTraitAndSubTrait = (
  selectedTrait: any,
  selectedSubTrait: any,
  selectedSubTraitValue: any
) =>
  path([selectedTrait, selectedSubTrait, selectedSubTraitValue], DEGODSMAPPER)

export const DegodsBuilder = ({ gridView }) => {
  const [animationParent] = useAutoAnimate()

  const traits = keys(DEGODSMAPPER)
  const [selectedTrait, setSelectedTrait] = useState(traits[0])
  const [selectedSubTrait, setSelectedSubTrait] = useState<string | number>(
    keys(DEGODSMAPPER[selectedTrait])[0]
  )
  const [selectedSubTraitValue, setSelectedSubTraitValue] = useState<
    string | number
  >(keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])[0])

  const [selectedTraits, setSelectedTraits] = useState(() => {
    return traits.reduce((acc: any, trait) => {
      acc[trait] = {
        value: keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])[0],
        key: keys(DEGODSMAPPER[trait])[0],
      }
      return acc
    }, {})
  })

  console.log({
    a: selectedTraits,
    selectedSubTrait,
  })

  const handleLeftClick = () => {
    const currentSubTraits = keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])
    const currentIndex = currentSubTraits.indexOf(
      selectedSubTraitValue as never
    )
    const nextIndex = currentIndex - 1
    if (nextIndex >= 0) {
      setSelectedSubTraitValue(currentSubTraits[nextIndex])
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: {
          value: currentSubTraits[nextIndex],
          key: selectedSubTrait,
        },
      }))
    } else {
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
  console.log({ selectedTraits })

  const handleRightClick = () => {
    const currentSubTraits = keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])
    const currentIndex = currentSubTraits.indexOf(
      selectedSubTraitValue as never
    )
    const nextIndex = currentIndex + 1
    if (nextIndex < currentSubTraits.length) {
      setSelectedSubTraitValue(currentSubTraits[nextIndex])
      setSelectedTraits((prev: any) => ({
        ...prev,
        [selectedTrait]: {
          value: currentSubTraits[nextIndex],
          key: selectedSubTrait,
        },
      }))
    } else {
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

  const a = DEGODS_BASE_URL[selectedTrait]
  const b = getValueForTraitAndSubTrait(
    selectedTrait,
    selectedSubTrait,
    selectedSubTraitValue
  )?.replace(`${selectedTrait}`, '')

  const renderedTraitImage = `${a}/${b}`

  const navigateSpecialty = (direction, trait) => {
    const subTraits = DEGODSMAPPER[trait] // Get all specialty sub-traits
    const subTraitKeys = keys(subTraits) // Get the keys for the sub-traits
    const currentKeyIndex = subTraitKeys.indexOf(selectedTraits[trait].key) // Find the index of the current sub-trait
    const currentSubTraitValues = keys(subTraits[selectedTraits[trait].key]) // Get all image keys for the current sub-trait
    const currentValueIndex = currentSubTraitValues.indexOf(
      selectedTraits[trait].value
    ) // Get the index of the current value

    let newSubTraitIndex, newValueIndex

    if (direction === 'right') {
      if (currentValueIndex < currentSubTraitValues.length - 1) {
        // If not at the last image, move to the next image
        newSubTraitIndex = currentKeyIndex
        newValueIndex = currentValueIndex + 1
      } else {
        // If at the last image, move to the first image of the next sub-trait
        newSubTraitIndex = (currentKeyIndex + 1) % subTraitKeys.length // Loop back if at the end
        newValueIndex = 0 // Start at the first image of the new sub-trait
      }
    } else if (direction === 'left') {
      if (currentValueIndex > 0) {
        // If not at the first image, move to the previous image
        newSubTraitIndex = currentKeyIndex
        newValueIndex = currentValueIndex - 1
      } else {
        // If at the first image, move to the last image of the previous sub-trait
        newSubTraitIndex =
          (currentKeyIndex - 1 + subTraitKeys.length) % subTraitKeys.length // Loop back if at the beginning
        newValueIndex =
          keys(subTraits[subTraitKeys[newSubTraitIndex]]).length - 1 // Last image of the new sub-trait
      }
    }

    const helperValue = keys(subTraits[subTraitKeys[newSubTraitIndex]])[
      newValueIndex
    ]
    setSelectedTraits((prev) => ({
      ...prev,
      [trait]: {
        value: helperValue,
        key: subTraitKeys[newSubTraitIndex],
      },
    }))
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [traitModal, setTraitModal] = useState('')

  const handleImageClick = (trait) => {
    onOpen()
    debugger
    setTraitModal(trait)
  }
  const traitOrder = [
    'Backgrounds',
    'Specialty',
    'Skins',
    'Clothes',
    'Head',
    'Eyes',
    'Mouth',
    'Neck',
  ]
  return (
    <>
      {gridView && (
        <>
          <div className='flex gap-y-3 flex-col'>
            <div className='flex flex-col md:flex-row justify-around'>
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Clothes'
                src={`${DEGODS_BASE_URL['Clothes']}/${
                  selectedTraits['Clothes'].key
                }/${selectedTraits['Clothes'].value.replace(/#/g, '%23')}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Clothes')}
                onRightClick={() => navigateSpecialty('right', 'Clothes')}
              />
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Neck'
                src={`${DEGODS_BASE_URL['Neck']}/${
                  selectedTraits['Neck'].key
                }/${selectedTraits['Neck'].value.replace(/#/g, '%23')}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Neck')}
                onRightClick={() => navigateSpecialty('right', 'Neck')}
              />
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Eyes'
                src={`${DEGODS_BASE_URL['Eyes']}/${
                  selectedTraits['Eyes'].key
                }/${selectedTraits['Eyes'].value.replace(/#/g, '%23')}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Eyes')}
                onRightClick={() => navigateSpecialty('right', 'Eyes')}
              />
            </div>
            <div className='flex flex-col md:flex-row justify-around gap-3'>
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Backgrounds'
                src={`${DEGODS_BASE_URL['Backgrounds']}/${
                  selectedTraits['Backgrounds'].key
                }/${selectedTraits['Backgrounds'].value.replace(
                  /#/g,
                  '%23'
                )}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Backgrounds')}
                onRightClick={() => navigateSpecialty('right', 'Backgrounds')}
              />
              <div className='grid items-center justify-center relative mt-4'>
                <div className='relative w-60 h-60' ref={animationParent}>
                  {traitOrder.map((trait) => (
                    <NextImage
                      key={`${DEGODS_BASE_URL[trait]}/${
                        selectedTraits[trait].key
                      }/${selectedTraits[trait].value.replace(
                        /#/g,
                        '%23'
                      )}.png`}
                      src={`${DEGODS_BASE_URL[trait]}/${
                        selectedTraits[trait].key
                      }/${selectedTraits[trait].value.replace(
                        /#/g,
                        '%23'
                      )}.png`}
                      alt={selectedTraits[trait].value}
                      width={240}
                      height={240}
                      className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                    />
                  ))}
                </div>
              </div>
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Specialty'
                src={`${DEGODS_BASE_URL['Specialty']}/${
                  selectedTraits['Specialty'].key
                }/${selectedTraits['Specialty'].value.replace(
                  /#/g,
                  '%23'
                )}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Specialty')}
                onRightClick={() => navigateSpecialty('right', 'Specialty')}
              />
            </div>
            <div className='flex flex-col md:flex-row justify-around gap-3'>
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Skins'
                src={`${DEGODS_BASE_URL['Skins']}/${
                  selectedTraits['Skins'].key
                }/${selectedTraits['Skins'].value.replace(/#/g, '%23')}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Skins')}
                onRightClick={() => navigateSpecialty('right', 'Skins')}
              />
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Head'
                src={`${DEGODS_BASE_URL['Head']}/${
                  selectedTraits['Head'].key
                }/${selectedTraits['Head'].value.replace(/#/g, '%23')}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Head')}
                onRightClick={() => navigateSpecialty('right', 'Head')}
              />
              <DisplaySingleTrait
                handleImageClick={handleImageClick}
                size={140}
                trait='Mouth'
                src={`${DEGODS_BASE_URL['Mouth']}/${
                  selectedTraits['Mouth'].key
                }/${selectedTraits['Mouth'].value.replace(/#/g, '%23')}.png`}
                onLeftClick={() => navigateSpecialty('left', 'Mouth')}
                onRightClick={() => navigateSpecialty('right', 'Mouth')}
              />
            </div>
          </div>
          <TraitModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle={traitModal}
          />
        </>
      )}
      {!gridView && (
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
                  setSelectedSubTrait(key)
                  setSelectedSubTraitValue(
                    keys(DEGODSMAPPER[selectedTrait][key])[0]
                  )
                }}
              >
                {keys(DEGODSMAPPER[selectedTrait])?.map((subtrait) => (
                  <DropdownItem key={subtrait}>{subtrait}</DropdownItem>
                ))}
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
                  setSelectedSubTraitValue(key)
                  setSelectedTraits((prev: any) => ({
                    ...prev,
                    [selectedTrait]: { value: key, key: selectedSubTrait },
                  }))
                }}
              >
                {keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])?.map(
                  (subtrait) => (
                    <DropdownItem key={subtrait}>{subtrait}</DropdownItem>
                  )
                )}
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
                  {traitOrder.map((trait) => (
                    <NextImage
                      key={trait}
                      src={`${DEGODS_BASE_URL[trait]}/${
                        selectedTraits[trait].key
                      }/${selectedTraits[trait].value.replace(
                        /#/g,
                        '%23'
                      )}.png`}
                      alt={selectedTraits[trait].value}
                      width={320}
                      height={320}
                      className='absolute inset-0 rounded-lg justify-self-center max-w-[320px]'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
