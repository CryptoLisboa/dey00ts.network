import {
  DEGODS_BASE_URL,
  DEGODSMAPPER,
  degodsTraitOrder,
} from '@/constants/degodsMapper'
import { keys } from 'ramda'
import { useState } from 'react'
import { NFTType } from '@/types/degods'
import { useLocalStorage } from 'usehooks-ts'
import dynamic from 'next/dynamic'
import { downloadImage, loadImage } from '@/utils/image.utils'
import { IMAGE_SIZE } from '@/constants/image.constants'
import { formatDate } from '@/utils/date.utils'

const DynamicSingleView = dynamic(() =>
  import('./DegodsSingleView').then((mod) => mod.DegodsSingleView)
)
const DynamicGridView = dynamic(() =>
  import('./DegodsGridView').then((mod) => mod.DegodsGridView)
)

type DegodsBuilderProps = {
  gridView: boolean
}

export const DegodsBuilder = ({ gridView }: DegodsBuilderProps) => {
  const traits = keys(DEGODSMAPPER)
  const [selectedTrait, setSelectedTrait] = useState(traits[0])
  const [selectedSubTrait, setSelectedSubTrait] = useState<string | number>(
    keys(DEGODSMAPPER[selectedTrait])[0]
  )
  const [selectedSubTraitValue, setSelectedSubTraitValue] = useState<
    string | number
  >(
    // @ts-expect-error
    keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])[0]
  )

  const [selectedTraits, setSelectedTraits] = useLocalStorage(
    NFTType.DEGODS,
    () => {
      return traits.reduce((acc: any, trait) => {
        if (trait === 'Skins') {
          acc[trait] = {
            value: 'X-ray 3',
            key: 'X-ray',
          }
          return acc
        }
        acc[trait] = {
          value: null, // keys(DEGODSMAPPER[selectedTrait][selectedSubTrait])[0],
          key: null, // keys(DEGODSMAPPER[trait])[0],
        }
        return acc
      }, {})
    }
  )
  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return
    // const imageSize = 3000
    canvas.width = IMAGE_SIZE
    canvas.height = IMAGE_SIZE

    const images =
      // selectedTraits['Background']
      //   ? `${YOOTS_BASE_URL}/Background/${selectedTraits['Background'].replace(
      //       /#/g,
      //       '%23'
      //     )}.png`
      //   : null
      degodsTraitOrder
        .map((trait) => {
          if (selectedTraits[trait]) {
            const val = selectedTraits[trait].value
            const key = selectedTraits[trait].key
            if (!val || !key) return null
            // @ts-expect-error
            return `${DEGODS_BASE_URL[trait]}/${key}/${val?.replace(
              /#/g,
              '%23'
            )}.png`
          }
          return null
        })
        .filter((src) => src !== null) as string[]

    Promise.all(images.map((src) => loadImage(src)))
      .then((loadedImages) => {
        loadedImages.forEach((img) => {
          context.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE)
        })
        const dataURL = canvas.toDataURL('image/png')
        downloadImage(dataURL, 'DeGod - ' + formatDate() + '.png')
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
          handleDownload={handleDownload}
        />
      )}
      {!gridView && (
        <DynamicSingleView
          traits={traits}
          selectedSubTrait={selectedSubTrait}
          selectedSubTraitValue={selectedSubTraitValue}
          selectedTrait={selectedTrait}
          selectedTraits={selectedTraits}
          handleDownload={handleDownload}
          setSelectedTraits={setSelectedTraits}
          // @ts-expect-error
          setSelectedTrait={setSelectedTrait}
          setSelectedSubTrait={setSelectedSubTrait}
          setSelectedSubTraitValue={setSelectedSubTraitValue}
        />
      )}
    </>
  )
}
