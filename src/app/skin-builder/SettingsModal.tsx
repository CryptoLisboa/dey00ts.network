import { degodsTraitOrder } from '@/constants/degodsMapper'
import { Button } from '@nextui-org/react'
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
  const orderedTraits = Array.from(order)
    .map((value, index) => `${index + 1}: ${value}`)
    .map((a) => (
      <>
        {a}
        <br />
      </>
    ))
  return (
    <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Settings</ModalHeader>
            <ModalBody>
              <div className='w-full px-1 py-2 rounded-small'>
                <Select
                  label='Layering order'
                  selectionMode='multiple'
                  placeholder='Select an animal'
                  selectedKeys={order}
                  className='max-w-full'
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
                <div className=''>
                  <p className='text-small text-default-500'>Order:</p>
                  <br />
                  {orderedTraits}
                </div>
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
