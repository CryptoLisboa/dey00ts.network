import { DEGODSMAPPER } from '@/constants/degodsMapper'
import { keys } from 'ramda'
import { useState } from 'react'
import { NFTType } from '@/types/degods'
import { useLocalStorage } from 'usehooks-ts'
import dynamic from 'next/dynamic'

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

  return (
    <>
      {gridView && (
        <DynamicGridView
          selectedTraits={selectedTraits}
          setSelectedTraits={setSelectedTraits}
        />
      )}
      {!gridView && (
        <DynamicSingleView
          traits={traits}
          selectedSubTrait={selectedSubTrait}
          selectedSubTraitValue={selectedSubTraitValue}
          selectedTrait={selectedTrait}
          selectedTraits={selectedTraits}
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
