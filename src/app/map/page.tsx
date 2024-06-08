'use client'

import {
  Button,
  Chip,
  Divider,
  Image,
  Input,
  select,
  Spinner,
} from '@nextui-org/react'
import NextImage from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { isY00tCollectionAddress } from '@/utils/de[id]/collection'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
} from '@/utils/de[id]/image'
import { useContext, useState } from 'react'
import AuthContext from '@/providers/AuthContext'
import useSWR from 'swr'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Page() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { data, isLoading } = useSWR('/api/map/users', fetcher)

  const { user } = useContext(AuthContext)

  return (
    <main className='dark flex w-full h-[85vh] relative' id='map'>
      {isLoading && (
        <div
          className='flex flex-col gap-3 w-[50px] h-[50px]'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 10000,
          }}
        >
          <Spinner size='lg' className='cursor-wait' color='warning' />
        </div>
      )}
      <div
        className='flex flex-col gap-3 w-[200px] h-[200px] md:w-[500px] md:h-[500px]'
        style={{
          position: 'absolute',
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

        {selectedUser && (
          <div className='flex flex-col gap-3 bg-white rounded-xl w-full md:w-1/2 p-3 items-center content-center'>
            <div className='flex gap-3 justify-between place-self-center align-middle self-center content-center'>
              <Image
                src={selectedUser.image || 'temp/avatar.png'}
                alt={'Testing'}
                width={50}
                height={50}
                className='rounded-full self-center content-center'
              />

              <div className='flex text-primary flex-col'>
                <span className='font-lucky'>{selectedUser.name}</span>
                <span className='font-lucky'>
                  {selectedUser.socials.twitterHandle}
                </span>
                <span className='font-lucky'>21m away</span>
              </div>
            </div>

            <Divider />

            <div className='grid grid-cols-2 gap-3 text-primary text-sm text-center font-bold'>
              <div className='grid-cols-1'>
                <h3 className='text-xs'>Total calls</h3>
                <p className=''>50</p>
              </div>
              <div className='grid-cols-1'>
                <h3 className='text-xs'>Success Rate</h3>
                <p className=''>99%</p>
              </div>
              <div className='grid-cols-1'>
                <h3 className='text-xs'>Profit Generated</h3>
                <p className=''>50€</p>
              </div>
              <div className='grid-cols-1'>
                <h3 className='text-xs'>Subscribers</h3>
                <p className=''>8200</p>
              </div>
            </div>

            <p className='text-left font-bold text-black'>Language:</p>

            <div className='flex gap-3'>
              {selectedUser?.languages?.map((language: any) => (
                <Chip key={language.id} variant='shadow' color='success'>
                  {language.name}
                </Chip>
              ))}
            </div>

            <p className='text-left font-bold text-black'>My Collections:</p>
            <div className='flex flex-row w-full overflow-x-scroll gap-6 '>
              {selectedUser?.collections?.map(
                (collection: {
                  id: number
                  contract: string
                  tokens: { id: number; tokenId: number }[]
                }) => (
                  <div key={collection.id} className='flex flex-col gap-1'>
                    <p className='font-bold text-black'>
                      {isY00tCollectionAddress(collection.contract)
                        ? 'y00ts'
                        : 'DeGods'}
                    </p>
                    <div className='flex flex-row gap-6'>
                      {collection.tokens.map(
                        (token: { id: number; tokenId: number }) => (
                          <div key={token.id} className='flex flex-col gap-1'>
                            <p className='text-black'>{token.tokenId}</p>
                            <Image
                              as={NextImage}
                              src={
                                isY00tCollectionAddress(collection.contract)
                                  ? generateY00tsImageUrl(
                                      token.tokenId,
                                      64,
                                      100
                                    )
                                  : generateDeGodsImageUrl(
                                      token.tokenId,
                                      64,
                                      100
                                    )
                              }
                              unoptimized
                              alt='Avatar'
                              className='rounded-xl min-w-16 min-h-16'
                              width={64}
                              height={64}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className='mt-4 flex gap-6'>
              <Button
                className='bg-transparent border-2 border-black text-black text-xs'
                as={Link}
                href={`https://twitter.com/${selectedUser?.socials?.twitterHandle}`}
                target='_blank'
              >
                <Image
                  as={NextImage}
                  src='/icons/twitter.svg'
                  alt='Add Icon'
                  width={24}
                  className='text-primary'
                  height={24}
                />
                {`Twitter`}
              </Button>
              <Button className='bg-transparent border-2 border-black text-black text-xs'>
                <Image
                  as={NextImage}
                  src='/icons/discord.svg'
                  alt='Add Icon'
                  width={24}
                  height={24}
                />
                {'Discord'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <DynamicMapView users={data} handleClick={setSelectedUser} />
    </main>
  )
}
