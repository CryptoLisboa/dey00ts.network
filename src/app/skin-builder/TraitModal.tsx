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

export const TraitModal = ({
  isOpen,
  modalTitle,
  onClose,
}: {
  isOpen: boolean
  modalTitle: string
  onClose: () => void
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
              <div className='w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                <Listbox
                  // topContent={topContent}
                  classNames={{
                    base: 'max-w-xs',
                    list: 'max-h-[300px] overflow-scroll',
                  }}
                  defaultSelectedKeys={['1']}
                  items={[
                    {
                      key: '1',
                      name: 'John Doe',
                      value: 'https://i.pravatar.cc/300',
                    },
                  ]}
                  label='Assigned to'
                  selectionMode='single'
                  // onSelectionChange={setValues}
                  variant='flat'
                >
                  {(item) => (
                    <ListboxItem key={item.key} textValue={item.value}>
                      <div className='flex gap-2 items-center'>
                        <Avatar
                          alt={item.value}
                          className='flex-shrink-0'
                          size='sm'
                          src={item.value}
                        />
                        <div className='flex flex-col'>
                          <span className='text-small'>{item.name}</span>
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
