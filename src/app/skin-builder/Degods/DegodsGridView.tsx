import {
  DEGODS_BASE_URL,
  DEGODSMAPPER,
  degodsTraitOrder,
} from '@/constants/degodsMapper'
import { DisplaySingleTrait } from '../DisplaySingleTrait'
import { Button, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TraitModal } from '../TraitModal'
import { NFTType } from '@/types/degods'
import NextImage from 'next/image'
import { SettingsModal } from '../SettingsModal'

type DegodsGridViewProps = {
  selectedTraits: any
  setSelectedTraits: (value: any) => void
}

export const DegodsGridView = ({
  selectedTraits,
  setSelectedTraits,
}: DegodsGridViewProps) => {
  const [animationParent] = useAutoAnimate()

  const navigateGridTrait = (direction: string, trait: string) => {
    // @ts-ignore
    const subTraits = DEGODSMAPPER[trait] // Get all specialty sub-traits
    const subTraitKeys = keys(subTraits) // Get the keys for the sub-traits
    const currentKeyIndex = subTraitKeys.indexOf(selectedTraits[trait].key) // Find the index of the current sub-trait
    const currentSubTraitValues = keys(subTraits[selectedTraits[trait].key]) // Get all image keys for the current sub-trait
    const currentValueIndex = currentSubTraitValues.indexOf(
      selectedTraits[trait].value
    ) // Get the index of the current value

    let newSubTraitIndex: any, newValueIndex

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

    if (newValueIndex) {
      const helperValue = keys(subTraits[subTraitKeys[newSubTraitIndex]])[
        newValueIndex
      ]
      setSelectedTraits((prev: any) => ({
        ...prev,
        [trait]: {
          value: helperValue,
          key: subTraitKeys[newSubTraitIndex],
        },
      }))
    }
  }
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [traitModal, setTraitModal] = useState('')

  const handleImageClick = (trait: string) => {
    onOpen()
    setTraitModal(trait)
  }

  const handleSelectionChange = (selected: any) => {
    setSelectedTraits((prev: any) => ({
      ...prev,
      [traitModal]: {
        value: selected?.key,
        key: selected?.name,
      },
    }))
    onClose()
  }
  const [controlledTraitOrder, setControlledTraitOrder] = useState(
    new Set(degodsTraitOrder)
  )

  const handleOrderSelectionChange = (e: any) => {
    setControlledTraitOrder(new Set(e.target.value.split(',')))
  }
  return (
    <>
      <div className='flex gap-y-3 flex-col'>
        <div className='flex flex-col md:flex-row justify-around'>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Clothes'
            src={`${DEGODS_BASE_URL['Clothes']}/${
              selectedTraits['Clothes'].key
            }/${selectedTraits['Clothes'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Clothes')}
            onRightClick={() => navigateGridTrait('right', 'Clothes')}
          />
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Neck'
            src={`${DEGODS_BASE_URL['Neck']}/${
              selectedTraits['Neck'].key
            }/${selectedTraits['Neck'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Neck')}
            onRightClick={() => navigateGridTrait('right', 'Neck')}
          />
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Eyes'
            src={`${DEGODS_BASE_URL['Eyes']}/${
              selectedTraits['Eyes'].key
            }/${selectedTraits['Eyes'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Eyes')}
            onRightClick={() => navigateGridTrait('right', 'Eyes')}
          />
        </div>
        <div className='flex flex-col md:flex-row justify-around gap-3'>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Backgrounds'
            src={`${DEGODS_BASE_URL['Backgrounds']}/${
              selectedTraits['Backgrounds'].key
            }/${selectedTraits['Backgrounds'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Backgrounds')}
            onRightClick={() => navigateGridTrait('right', 'Backgrounds')}
          />
          <div className='grid items-center justify-center relative mt-4'>
            <div className='relative w-60 h-60' ref={animationParent}>
              {Array.from(controlledTraitOrder || []).map((trait) => {
                if (trait === '') return null
                const val = selectedTraits[trait].value
                const key = selectedTraits[trait].key

                if (!val || !key) return null
                // @ts-expect-error
                const src = `${DEGODS_BASE_URL[trait]}/${key}/${val?.replace(
                  /#/g,
                  '%23'
                )}.png`
                if (src.includes('undefined' || 'null')) return null
                return (
                  <NextImage
                    key={src}
                    src={src}
                    alt={selectedTraits[trait].value}
                    width={240}
                    height={240}
                    className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                  />
                )
              })}
              <Button
                className='absolute w-6 h-6 top-0 right-0 mt-2 mr-2'
                onClick={onOpenSettings}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </Button>
              <SettingsModal
                isOpen={isOpenSettings}
                onClose={onCloseSettings}
                order={controlledTraitOrder}
                setOrder={handleOrderSelectionChange}
              />
            </div>
          </div>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Specialty'
            src={`${DEGODS_BASE_URL['Specialty']}/${
              selectedTraits['Specialty'].key
            }/${selectedTraits['Specialty'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Specialty')}
            onRightClick={() => navigateGridTrait('right', 'Specialty')}
          />
        </div>
        <div className='flex flex-col md:flex-row justify-around gap-3'>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Skins'
            src={`${DEGODS_BASE_URL['Skins']}/${
              selectedTraits['Skins'].key
            }/${selectedTraits['Skins'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Skins')}
            onRightClick={() => navigateGridTrait('right', 'Skins')}
          />
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Head'
            src={`${DEGODS_BASE_URL['Head']}/${
              selectedTraits['Head'].key
            }/${selectedTraits['Head'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Head')}
            onRightClick={() => navigateGridTrait('right', 'Head')}
          />
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={140}
            trait='Mouth'
            src={`${DEGODS_BASE_URL['Mouth']}/${
              selectedTraits['Mouth'].key
            }/${selectedTraits['Mouth'].value?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Mouth')}
            onRightClick={() => navigateGridTrait('right', 'Mouth')}
          />
        </div>
      </div>
      <TraitModal
        nftType={NFTType.DEGODS}
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={traitModal}
        handleSelectionChange={handleSelectionChange}
      />
    </>
  )
}
