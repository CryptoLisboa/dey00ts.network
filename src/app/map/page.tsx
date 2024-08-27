'use client'

import { useUsersMap } from '@/hooks/useUserData'
// import { Chip } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

export default function Page() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { data } = useUsersMap()

  return (
    <main
      className='dark flex flex-col gap-y-3 w-full h-[85vh] relative'
      id='map'
    >
      {/* <div
        className='flex flex-col gap-3 w-fit h-fit'
        style={{
          top: 10,
          left: 60,
          zIndex: 10000,
        }}
      >
        <div className='flex gap-3'>
          <Chip variant='shadow' color='success'>
            DeGods
          </Chip>
          <Chip variant='shadow' color='warning'>
            Y00ts
          </Chip>
          <Chip variant='shadow' color='primary'>
            BTC DeGods
          </Chip>
        </div>
      </div> */}
      <DynamicMapView
        users={data}
        handleClick={setSelectedUser}
        selectedUser={selectedUser}
      />
    </main>
  )
}
