//  @ts-nocheck
'use client'
import { YOOTS_BASE_URL, YOOTSMAPPER } from '@/constants/yootsMapper'
import { keys } from 'ramda'
import { Key, useState } from 'react'
import { NFTType } from '@/types/degods'
import { useLocalStorage } from 'usehooks-ts'
import dynamic from 'next/dynamic'

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

  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return
    canvas.width = 3000
    canvas.height = 3000

    const images = [
      `${YOOTS_BASE_URL}/Background/${selectedTraits['Background'].replace(
        /#/g,
        '%23'
      )}.png`,
      `${YOOTS_BASE_URL}/Skins/${selectedTraits['Skins'].replace(
        /#/g,
        '%23'
      )}.png`,
      `${YOOTS_BASE_URL}/Eyes/${selectedTraits['Eyes'].replace(
        /#/g,
        '%23'
      )}.png`,
      `${YOOTS_BASE_URL}/Head/${selectedTraits['Head'].replace(
        /#/g,
        '%23'
      )}.png`,
      `${YOOTS_BASE_URL}/Clothes/${selectedTraits['Clothes'].replace(
        /#/g,
        '%23'
      )}.png`,
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
      {gridView && (
        <DynamicGridView
          selectedTraits={selectedTraits}
          setSelectedTraits={setSelectedTraits}
          setSelectedTrait={setSelectedTrait}
          setSelectedSubTrait={setSelectedSubTrait}
          selectedTrait={selectedTrait}
          selectedSubTrait={selectedSubTrait}
          traits={traits}
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
