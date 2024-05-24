// @ts-nocheck
import { DEGODSMAPPER } from '@/constants/degodsMapper'
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import NextImage from 'next/image'
import { keys, path } from 'ramda'
import { useState } from 'react'
import { DisplaySingleTrait } from './DisplaySingleTrait'

const BASE_URL = {
  Backgrounds:
    'https://bafybeihnbn4zgm27jputfhxlbtlyain3k3kdfv6dnu37tb473zoowwdb6a.ipfs.dweb.link',
  Backgrounds_ipfs_uri: 'ipfs://QmeHyUvwe22ww6LuQy7cbGw5jxjCbNq9SaF7nhjqcvvfKD',
  Clothes:
    'https://bafybeigntq74czaglmytesw5u5bgqiuhghuzwxpyn2igijqy5vbzanpqbm.ipfs.dweb.link',
  Clothes_ipfs_uri: 'ipfs://QmcBGUWEw6DKhMBaf5KtPvEWDU5WySHCfwa5jAWrj6D3W2',
  Eyes: 'https://bafybeigim6kdmzlme4ai6hzfrhn3uymzuzsg4osjs5lfltifwhpqbew4im.ipfs.dweb.link/',
  Eyes_ipfs_uri: 'ipfs://QmbpwrXwmfb6AU7JbVBLdyGkC43mo6Ah3fMVZoW5ZdYRKx',
  Head: 'https://bafybeid3pam53yhwk67lku4kwizslyxkzqhyd5ddie4hwknlfmflvcdb34.ipfs.dweb.link',
  Head_ipfs_uri: 'ipfs://QmWed5GJrNARWemoKnJhfuNHZpCeaRhxt4KkkXdKtUUHs4',
  Mouth:
    'https://bafybeihnydqqpaeenlfvsntyy2y26ujpohrlmzqftksc5n7cqmdxysa2vi.ipfs.dweb.link',
  Mouth_ipfs_uri: 'pfs://QmeLjv9M6ZGJTiqcJ5XKMKYVpG11eKMwkEsoGYRngAkLh7',
  Neck: 'https://bafybeifa35pzmciwbxy6oqsk2rjjyojk2xzkbew5shbs5a3pnqugx6zxm4.ipfs.dweb.link',
  Neck_ipfs_uri: 'ipfs://QmZAdVbAgtdRuuu46xzMZxmAAaDMAc3H79tBTdUcBPPJCv',
  Skins:
    'https://bafybeihrzkh3bnp2n53xr77csfyj6uyyud7cie43oworzvs55343aavdpy.ipfs.dweb.link',
  Skins_ipfs_uri: 'ipfs://QmecW7PRT9Esmiy9Gdw9YKeYZqk11jB858EkbG8jBtw9x9',
  Specialty:
    'https://bafybeib5zumzk2tzxn3pbixrp622xsqxvkpxlo5uvrjlrectpicsac2qvy.ipfs.dweb.link',
  Specialty_ipfs_uri: 'ipfs://QmSVtyF6dUzbjmBEEuqXhbTjXxjkmnrdoJmw7GDkYCYsgh',
}

const getValueForTraitAndSubTrait = (
  selectedTrait: any,
  selectedSubTrait: any,
  selectedSubTraitValue: any
) =>
  path([selectedTrait, selectedSubTrait, selectedSubTraitValue], DEGODSMAPPER)

export const DegodsBuilder = ({ gridView }) => {
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

  const a = BASE_URL[selectedTrait]
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
  return (
    <>
      {gridView && (
        <div className='flex gap-y-3 flex-col'>
          <div className='flex flex-col md:flex-row justify-around'>
            <DisplaySingleTrait
              size={140}
              trait='Clothes'
              src={`${BASE_URL['Clothes']}/${
                selectedTraits['Clothes'].key
              }/${selectedTraits['Clothes'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Clothes')}
              onRightClick={() => navigateSpecialty('right', 'Clothes')}
            />
            <DisplaySingleTrait
              size={140}
              trait='Neck'
              src={`${BASE_URL['Neck']}/${
                selectedTraits['Neck'].key
              }/${selectedTraits['Neck'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Neck')}
              onRightClick={() => navigateSpecialty('right', 'Neck')}
            />
            <DisplaySingleTrait
              size={140}
              trait='Eyes'
              src={`${BASE_URL['Eyes']}/${
                selectedTraits['Eyes'].key
              }/${selectedTraits['Eyes'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Eyes')}
              onRightClick={() => navigateSpecialty('right', 'Eyes')}
            />
          </div>
          <div className='flex flex-col md:flex-row justify-around gap-3'>
            <DisplaySingleTrait
              size={140}
              trait='Backgrounds'
              src={`${BASE_URL['Backgrounds']}/${
                selectedTraits['Backgrounds'].key
              }/${selectedTraits['Backgrounds'].value.replace(
                /#/g,
                '%23'
              )}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Backgrounds')}
              onRightClick={() => navigateSpecialty('right', 'Backgrounds')}
            />
            <div className='grid items-center justify-center relative mt-4'>
              <div className='relative w-60 h-60'>
                <NextImage
                  src={`${BASE_URL['Backgrounds']}/${
                    selectedTraits['Backgrounds'].key
                  }/${selectedTraits['Backgrounds'].value.replace(
                    /#/g,
                    '%23'
                  )}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Specialty']}/${
                    selectedTraits['Specialty'].key
                  }/${selectedTraits['Specialty'].value.replace(
                    /#/g,
                    '%23'
                  )}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Clothes']}/${
                    selectedTraits['Clothes'].key
                  }/${selectedTraits['Clothes'].value.replace(
                    /#/g,
                    '%23'
                  )}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Skins']}/${
                    selectedTraits['Skins'].key
                  }/${selectedTraits['Skins'].value.replace(/#/g, '%23')}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Head']}/${
                    selectedTraits['Head'].key
                  }/${selectedTraits['Head'].value.replace(/#/g, '%23')}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Eyes']}/${
                    selectedTraits['Eyes'].key
                  }/${selectedTraits['Eyes'].value.replace(/#/g, '%23')}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Mouth']}/${
                    selectedTraits['Mouth'].key
                  }/${selectedTraits['Mouth'].value.replace(/#/g, '%23')}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
                <NextImage
                  src={`${BASE_URL['Neck']}/${
                    selectedTraits['Neck'].key
                  }/${selectedTraits['Neck'].value.replace(/#/g, '%23')}.png`}
                  alt={`${selectedSubTraitValue}`}
                  width={240}
                  height={240}
                  className='absolute inset-0 rounded-lg justify-self-center max-w-[240px]'
                />
              </div>
            </div>
            <DisplaySingleTrait
              size={140}
              trait='Specialty'
              src={`${BASE_URL['Specialty']}/${
                selectedTraits['Specialty'].key
              }/${selectedTraits['Specialty'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Specialty')}
              onRightClick={() => navigateSpecialty('right', 'Specialty')}
            />
          </div>
          <div className='flex flex-col md:flex-row justify-around gap-3'>
            <DisplaySingleTrait
              size={140}
              trait='Skins'
              src={`${BASE_URL['Skins']}/${
                selectedTraits['Skins'].key
              }/${selectedTraits['Skins'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Skins')}
              onRightClick={() => navigateSpecialty('right', 'Skins')}
            />
            <DisplaySingleTrait
              size={140}
              trait='Head'
              src={`${BASE_URL['Head']}/${
                selectedTraits['Head'].key
              }/${selectedTraits['Head'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Head')}
              onRightClick={() => navigateSpecialty('right', 'Head')}
            />
            <DisplaySingleTrait
              size={140}
              trait='Mouth'
              src={`${BASE_URL['Mouth']}/${
                selectedTraits['Mouth'].key
              }/${selectedTraits['Mouth'].value.replace(/#/g, '%23')}.png`}
              onLeftClick={() => navigateSpecialty('left', 'Mouth')}
              onRightClick={() => navigateSpecialty('right', 'Mouth')}
            />
          </div>
        </div>
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
                <div className='relative w-80 h-80'>
                  {' '}
                  {/* fixed size for the relative container */}
                  <NextImage
                    src={`${BASE_URL['Backgrounds']}/${
                      selectedTraits['Backgrounds'].key
                    }/${selectedTraits['Backgrounds'].value.replace(
                      /#/g,
                      '%23'
                    )}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                  <NextImage
                    src={`${BASE_URL['Skins']}/${
                      selectedTraits['Skins'].key
                    }/${selectedTraits['Skins'].value.replace(
                      /#/g,
                      '%23'
                    )}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                  <NextImage
                    src={`${BASE_URL['Neck']}/${
                      selectedTraits['Neck'].key
                    }/${selectedTraits['Neck'].value.replace(/#/g, '%23')}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                  <NextImage
                    src={`${BASE_URL['Head']}/${
                      selectedTraits['Head'].key
                    }/${selectedTraits['Head'].value.replace(/#/g, '%23')}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                  <NextImage
                    src={`${BASE_URL['Mouth']}/${
                      selectedTraits['Mouth'].key
                    }/${selectedTraits['Mouth'].value.replace(
                      /#/g,
                      '%23'
                    )}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                  <NextImage
                    src={`${BASE_URL['Eyes']}/${
                      selectedTraits['Eyes'].key
                    }/${selectedTraits['Eyes'].value.replace(/#/g, '%23')}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                  <NextImage
                    src={`${BASE_URL['Specialty']}/${
                      selectedTraits['Specialty'].key
                    }/${selectedTraits['Specialty'].value.replace(
                      /#/g,
                      '%23'
                    )}.png`}
                    alt={`${selectedSubTraitValue}`}
                    width={320}
                    height={320}
                    className='absolute inset-0 rounded-lg justify-self-center'
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
