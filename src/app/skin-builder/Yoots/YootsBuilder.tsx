//  @ts-nocheck
'use client'
import {
  YOOTS_BASE_URL,
  YOOTSMAPPER,
  yootsTraitOrder,
} from '@/constants/yootsMapper'
import { keys } from 'ramda'
import { Key, useState } from 'react'
import { NFTType } from '@/types/degods'
import { useLocalStorage } from 'usehooks-ts'
import dynamic from 'next/dynamic'
import { downloadImage, loadImage } from '@/utils/image.utils'
import { IMAGE_SIZE } from '@/constants/image.constants'
import { formatDate } from '@/utils/date.utils'

const DynamicSingleView = dynamic(() =>
  import('./YootsSingleView').then((mod) => mod.YootsSingleView)
)
const DynamicGridView = dynamic(() =>
  import('./YootsGridView').then((mod) => mod.YootsGridView)
)

export const YootsBuilder = ({ gridView }: { gridView: boolean }) => {
  const traits = keys(YOOTSMAPPER)

  const [selectedTraits, setSelectedTraits] = useLocalStorage(
    NFTType.YOOTS,
    () => {
      return traits.reduce((acc: any, trait) => {
        if (trait === 'Skins') {
          acc[trait] = 'Redlines 127 1'
          return acc
        }
        acc[trait] = null
        return acc
      }, {})
    }
  )

  const [selectedTrait, setSelectedTrait] = useState(traits[0])
  const [selectedSubTrait, setSelectedSubTrait] = useState<Key>(
    keys(YOOTSMAPPER[selectedTrait])[0]
  )

  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return
    // const imageSize = 3000
    canvas.width = IMAGE_SIZE
    canvas.height = IMAGE_SIZE

    const images = yootsTraitOrder
      .map((trait) =>
        selectedTraits[trait]
          ? `${YOOTS_BASE_URL}/${trait}/${selectedTraits[trait].replace(
              /#/g,
              '%23'
            )}.png`
          : null
      )
      .filter((src) => src !== null) as string[]

    Promise.all(images.map((src) => loadImage(src)))
      .then((loadedImages) => {
        loadedImages.forEach((img) => {
          context.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE)
        })
        const dataURL = canvas.toDataURL('image/png')
        downloadImage(dataURL, 'y00t - ' + formatDate() + '.png')
      })
      .catch((err) => {
        console.error('Failed to load images', err)
      })
  }

  return (
    <>
      {gridView && (
        <DynamicGridView
          selectedTraits={selectedTraits}
          setSelectedTraits={setSelectedTraits}
          setSelectedTrait={setSelectedTrait}
          setSelectedSubTrait={setSelectedSubTrait}
          selectedTrait={selectedTrait}
          selectedSubTrait={selectedSubTrait}
          traits={traits}
          handleDownload={handleDownload}
        />
      )}

      {!gridView && (
        <DynamicSingleView
          selectedTraits={selectedTraits}
          selectedTrait={selectedTrait}
          selectedSubTrait={selectedSubTrait}
          traits={traits}
          handleDownload={handleDownload}
          setSelectedTrait={setSelectedTrait}
          setSelectedSubTrait={setSelectedSubTrait}
          setSelectedTraits={setSelectedTraits}
        />
      )}
    </>
  )
}
