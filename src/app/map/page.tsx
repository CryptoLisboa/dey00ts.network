'use client'

import { Chip, Image, Input } from '@nextui-org/react'
import NextImage from 'next/image'
import dynamic from 'next/dynamic'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

export default function Page() {
  return (
    <main className='dark flex w-full h-[85vh] relative' id='map'>
      <div
        className='flex flex-col gap-3 w-[200px] h-[200px] md:w-[500px] md:h-[500px]'
        style={{
          position: 'absolute',
          // width: 500,
          // height: 500,
          top: 10,
          left: 60,
          zIndex: 10000,
        }}
      >
        <Input
          type='location'
          placeholder='Search by: Interest, location, language'
          labelPlacement='outside'
          className='w-full'
          startContent={
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
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          }
        />

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

        {true && (
          <div className='flex gap-3 bg-white rounded-xl w-1/2 justify-around p-3'>
            <Image
              src={'temp/avatar.png'}
              alt={'Testing'}
              width={50}
              height={50}
              className='rounded-full'
            />

            <div className='flex flex-col'>
              <span className='font-lucky'>username</span>
              <span className='font-lucky'>location</span>
            </div>
          </div>
        )}
      </div>
      <DynamicMapView />
    </main>
  )
}
