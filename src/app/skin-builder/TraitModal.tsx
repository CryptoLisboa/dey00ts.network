// @ts-nocheck
import { DEGODS_BASE_URL, DEGODSMAPPER } from '@/constants/degodsMapper'
import { YOOTSMAPPER } from '@/constants/yootsMapper'
import { NFTType } from '@/types/degods'
import {
  Avatar,
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'

const getListBoxItems = (traitType: string) => {
  const traitData = DEGODSMAPPER[traitType]
  const baseUrl = DEGODS_BASE_URL[traitType]
  const items = []

  Object.keys(traitData).forEach((key) => {
    const urlPrefix = `${baseUrl}`
    Object.keys(traitData[key]).forEach((subKey) => {
      const imageName = traitData[key][subKey].replace(`${traitType}`, '')
      items.push({
        key: subKey,
        name: key,
        value: `${urlPrefix}${imageName}`,
      })
    })
  })

  return items
}
const getYootsListBoxItems = (traitType) => {
  const traitData = YOOTSMAPPER[traitType]
  const baseUrl =
    'https://bafybeidz4pvfdd6yyu4mx3xwfo2imxfjtwc3vugmcrgfeq5u7skgj36moy.ipfs.dweb.link'
  // const baseUrl = 'https://bafybeihu3veecxn5bscv3jrenittgviqkbe4epek6poggozbbdsx2vm6jy.ipfs.dweb.link'
  const items = []

  Object.keys(traitData).forEach((key) => {
    const urlPrefix = `${baseUrl}/` // Ensure the base URL is correctly formatted with a trailing slash
    const imageName = traitData[key]
    items.push({
      key: key,
      name: traitType,
      value: `${urlPrefix}${imageName}`,
    })
  })

  return items
}

export const TraitModal = ({
  isOpen,
  modalTitle,
  onClose,
  handleSelectionChange,
  nftType,
}: {
  isOpen: boolean
  modalTitle: string
  onClose: () => void
  nftType: NFTType
  handleSelectionChange: (selected: string) => void
}) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {modalTitle}
            </ModalHeader>
            <ModalBody>
              <div className='w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                <Listbox
                  classNames={{
                    list: 'max-h-[300px] overflow-scroll',
                  }}
                  items={
                    nftType === NFTType.DEGODS
                      ? getListBoxItems(modalTitle)
                      : nftType === NFTType.YOOTS
                      ? getYootsListBoxItems(modalTitle)
                      : []
                  }
                  label='Assigned to'
                  selectionMode='single'
                  variant='flat'
                >
                  {(item) => (
                    <ListboxItem
                      key={item.value}
                      textValue={item.value}
                      onClick={() => handleSelectionChange(item)}
                    >
                      <div className='flex gap-2 items-center'>
                        <Avatar
                          alt={item.value}
                          className='flex-shrink-0'
                          size='sm'
                          src={item.value}
                        />
                        <div className='flex flex-col'>
                          <span className='text-small'>
                            {item.name}/{item.key}
                          </span>
                        </div>
                      </div>
                    </ListboxItem>
                  )}
                </Listbox>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-between'>
              <Button
                color='danger'
                onPress={() => {
                  onClose()
                  handleSelectionChange(null)
                }}
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
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </Button>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
