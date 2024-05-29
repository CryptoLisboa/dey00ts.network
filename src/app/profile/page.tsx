'use client'

import { IAuthUser } from '@/types/auth.types'
import { Button, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
} from '@/utils/de[id]/image'
import {
  hasDeGodsNFTs,
  hasY00tsNFTs,
  isY00tCollectionAddress,
} from '@/utils/de[id]/collection'
import { has } from 'ramda'

const fetchProfile = async (setProfile: (arg0: any) => void) => {
  const response = await fetch('api/user')
  const data = await response.json()
  setProfile(data)
}

export default function Profile() {
  const [profile, setProfile] = useState<IAuthUser>()

  useEffect(() => {
    fetchProfile(setProfile)
  }, [])

  console.log('profile', profile)

  return !profile ? (
    'loading'
  ) : (
    <main className='container pt-0 mx-auto p-4'>
      <div className='flex flex-col items-center mb-4'>
        <Image
          as={NextImage}
          src={profile.image}
          alt='Avatar'
          className='rounded-full w-56 h-56'
          width={224}
          height={224}
        />
        <p className='text-sm font-bold text-gray-400'>
          {profile.socials.twitterHandle}
        </p>
      </div>
      <h3 className='mt-4 text-lg text-full-stack font-bold'>Full Stack</h3>
      <div className='flex flex-col gap-1'>
        <div className='flex p-1 gap-3'>
          <Image
            as={NextImage}
            src='/icons/location.svg'
            alt='Location Icon'
            width={24}
            height={24}
          />
          <p>Portugal</p>
        </div>
        <div className='flex p-1 gap-3'>
          <Image
            as={NextImage}
            src='/icons/message.svg'
            alt='Location Icon'
            width={24}
            height={24}
          />
          {/* {profile.} */}
          <p>English</p>
          <p>Portuguese</p>
          <p>Criol</p>
          <p>Spanish</p>
        </div>
      </div>

      <h3 className='mt-4 text-lg font-bold'>Bio</h3>
      <p className='text-sm '>
        cpu janitor. tech aficionado & truth seeker. culture explorer. turning
        thoughts into code poetry since 2015.
      </p>

      <h3 className='mt-4 text-lg font-bold'>Experiences</h3>
      <p className='text-sm '>
        cuf | frontend lead
        <br />
        01/02/2017 - 02/02/2020
      </p>
      <p className='text-sm '>
        web3 | lp donat00r
        <br />
        02/02/2017 - current
      </p>
      <p className='text-sm '>
        dealpha | janitor
        <br />
        03/02/2020 - current
      </p>

      <h3 className='mt-4 text-lg font-bold'>Skills</h3>
      <div className='flex flex-wrap gap-6'>
        <Button className='bg-transparent border-1 border-full-stack text-full-stack'>
          Full Stack
        </Button>
        <Button className='bg-transparent border-1 border-evm-dev text-evm-dev'>
          EVM Dev
        </Button>
        <Button className='bg-transparent border-1 border-space-host text-space-host'>
          Space Host
        </Button>
        <Button className='bg-transparent border-1 border-community-builder text-community-builder'>
          Community Builder
        </Button>
        <Button className='bg-transparent border-1 border-alpha-caller text-alpha-caller'>
          Alpha Caller
        </Button>
      </div>

      <h3 className='mt-4 text-lg font-bold'>Communities</h3>
      <div className='flex flex-wrap gap-6'>
        {hasY00tsNFTs(profile) && <p className='font-bold'>y00ts</p>}
        {hasDeGodsNFTs(profile) && <p className='font-bold'>DeGods</p>}
      </div>

      <h3 className='mt-4 text-lg font-bold'>NFTs</h3>
      <div className='flex flex-wrap gap-6'>
        {profile.collections.map((collection) => (
          <div key={collection.id} className='flex flex-col gap-1'>
            <p className='font-bold'>
              {isY00tCollectionAddress(collection.contract)
                ? 'y00ts'
                : 'DeGods'}
            </p>
            <div className='flex flex-wrap gap-6'>
              {collection.tokens.map((token) => (
                <div key={token.id} className='flex flex-col gap-1'>
                  <p>{token.tokenId}</p>
                  <Image
                    as={NextImage}
                    src={
                      isY00tCollectionAddress(collection.contract)
                        ? generateY00tsImageUrl(token.tokenId, 224, 100)
                        : generateDeGodsImageUrl(token.tokenId, 224, 100)
                    }
                    alt='Avatar'
                    className='rounded-3xl w-56 h-56'
                    width={224}
                    height={224}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4 flex gap-6'>
        <Button className='bg-transparent border-1 border-[#D9D9D980] text-white'>
          <Image
            as={NextImage}
            src='/icons/discord.svg'
            alt='Add Icon'
            width={24}
            height={24}
          />
          {profile.socials.discordUsername}
        </Button>

        <Button
          className='bg-transparent border-1 border-[#D9D9D980] text-white'
          as={Link}
          href={`https://twitter.com/${profile.socials.twitterHandle}`}
          target='_blank'
        >
          <Image
            as={NextImage}
            src='/icons/twitter.svg'
            alt='Add Icon'
            width={24}
            height={24}
          />
          {`twitter.com/${profile.socials.twitterHandle}`}
        </Button>
      </div>
    </main>
  )
}
