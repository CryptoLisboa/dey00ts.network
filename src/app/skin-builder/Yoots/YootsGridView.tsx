import {
  YOOTS_BASE_URL,
  YOOTSMAPPER,
  yootsTraitOrder,
} from '@/constants/yootsMapper'
import { DisplaySingleTrait } from '../DisplaySingleTrait'
import NextImage from 'next/image'
import { TraitModal } from '../TraitModal'
import { NFTType } from '@/types/degods'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { keys } from 'ramda'

type YootsGridViewProps = {
  selectedTraits: any
  setSelectedTraits: (value: any) => void
  setSelectedSubTrait: (value: any) => void
  selectedSubTrait: string
}
export const YootsGridView = ({
  selectedTraits,
  setSelectedTraits,
  setSelectedSubTrait,
  selectedSubTrait,
}: YootsGridViewProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [animationParent] = useAutoAnimate()
  const [traitModal, setTraitModal] = useState('')

  const handleImageClick = (trait: string) => {
    onOpen()
    setTraitModal(trait)
  }
  const handleSelectionChange = (selected: any) => {
    setSelectedTraits((prev: any) => ({
      ...prev,
      [traitModal]: selected?.key,
    }))
    onClose()
  }

  const navigateGridTrait = (direction: string, trait: string) => {
    // @ts-ignore
    const subTraits = keys(YOOTSMAPPER[trait])
    let currentIndex = subTraits.indexOf(selectedSubTrait)
    if (direction === 'right') {
      currentIndex = (currentIndex + 1) % subTraits.length
    } else {
      currentIndex = (currentIndex - 1 + subTraits.length) % subTraits.length
    }
    const newSubTrait = subTraits[currentIndex]
    setSelectedSubTrait(newSubTrait)
    setSelectedTraits((prev: any) => ({
      ...prev,
      [trait]: newSubTrait,
    }))
  }
  return (
    <>
      <div className='flex gap-y-3 flex-col'>
        <div className='flex flex-col md:flex-row justify-around'>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={180}
            trait='Background'
            src={`${YOOTS_BASE_URL}/Background/${selectedTraits[
              'Background'
            ]?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Background')}
            onRightClick={() => navigateGridTrait('right', 'Background')}
          />
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={180}
            trait='Clothes'
            src={`${YOOTS_BASE_URL}/Clothes/${selectedTraits[
              'Clothes'
            ]?.replace(/#/g, '%23')}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Clothes')}
            onRightClick={() => navigateGridTrait('right', 'Clothes')}
          />
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={180}
            trait='Eyes'
            src={`${YOOTS_BASE_URL}/Eyes/${selectedTraits['Eyes']?.replace(
              /#/g,
              '%23'
            )}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Eyes')}
            onRightClick={() => navigateGridTrait('right', 'Eyes')}
          />
        </div>
        <div className='flex flex-col md:flex-row justify-around gap-3'>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={180}
            trait='Head'
            src={`${YOOTS_BASE_URL}/Head/${selectedTraits['Head']?.replace(
              /#/g,
              '%23'
            )}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Head')}
            onRightClick={() => navigateGridTrait('right', 'Head')}
          />
          <div className='grid items-center justify-center relative mt-4'>
            <div className='relative w-60 h-60' ref={animationParent}>
              {yootsTraitOrder.map((trait) => {
                const val = selectedTraits[trait]
                if (!val) return null
                const src = `${YOOTS_BASE_URL}/${trait}/${val?.replace(
                  /#/g,
                  '%23'
                )}.png`

                if (src.includes('undefined' || 'null')) return null
                return (
                  <NextImage
                    key={trait}
                    src={src}
                    alt={src}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                )
              })}
            </div>
          </div>
          <DisplaySingleTrait
            handleImageClick={handleImageClick}
            size={180}
            trait='Skins'
            src={`${YOOTS_BASE_URL}/Skins/${selectedTraits['Skins']?.replace(
              /#/g,
              '%23'
            )}.png`}
            onLeftClick={() => navigateGridTrait('left', 'Skins')}
            onRightClick={() => navigateGridTrait('right', 'Skins')}
          />
        </div>
      </div>
      <TraitModal
        nftType={NFTType.YOOTS}
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={traitModal}
        handleSelectionChange={handleSelectionChange}
      />
    </>
  )
}
