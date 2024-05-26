import { degodsTraitOrder } from '@/constants/degodsMapper'
import { Button } from '@nextui-org/button'
import {
  Listbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react'

type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
  order: Set<string>
  setOrder: (order: Set<string>) => void
}

export const SettingsModal = ({
  isOpen,
  onClose,
  order,
  setOrder,
}: SettingsModalProps) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Settings</ModalHeader>
            <ModalBody>
              <div className='w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                <h1>Layering order?</h1>
                <Select
                  label='Order the layers of the traits'
                  selectionMode='multiple'
                  placeholder='Select an animal'
                  selectedKeys={order}
                  className='max-w-xs'
                  // @ts-ignore
                  onChange={setOrder}
                >
                  {degodsTraitOrder.map((trait, index) => (
                    <SelectItem
                      key={trait}
                      value={trait}
                      selectedIcon={
                        <div>
                          {Array.from(order).indexOf(trait) + 1 === 0
                            ? ''
                            : Array.from(order).indexOf(trait) + 1}
                        </div>
                      }
                    >
                      {trait}
                    </SelectItem>
                  ))}
                </Select>
                <p className='text-small text-default-500'>
                  Order:{' '}
                  {Array.from(order)
                    .map((value, index) => `${index + 1}: ${value}`)
                    .join(', ')}
                </p>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-between'>
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
