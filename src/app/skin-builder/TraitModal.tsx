// @ts-nocheck
import { DEGODS_BASE_URL, DEGODSMAPPER } from '@/constants/degodsMapper'
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

  debugger
  Object.keys(traitData).forEach((key) => {
    const urlPrefix = `${baseUrl}`
    Object.keys(traitData[key]).forEach((subKey) => {
      const imageName = traitData[key][subKey].replace(`${traitType}`, '')
      debugger
      items.push({
        key: subKey,
        name: key,
        value: `${urlPrefix}${imageName}`,
      })
    })
  })

  return items
}
export const TraitModal = ({
  isOpen,
  modalTitle,
  onClose,
}: {
  isOpen: boolean
  modalTitle: string
  onClose: () => void
}) => {
  console.log({ a: modalTitle !== '' && getListBoxItems(modalTitle) })
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
                  // topContent={topContent}
                  classNames={{
                    list: 'max-h-[300px] overflow-scroll',
                  }}
                  defaultSelectedKeys={['1']}
                  items={getListBoxItems(modalTitle)}
                  label='Assigned to'
                  selectionMode='single'
                  // onSelectionChange={setValues}
                  variant='flat'
                >
                  {(item) => (
                    <ListboxItem key={item.value} textValue={item.value}>
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
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
