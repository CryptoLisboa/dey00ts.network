import { Button, Chip, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { isY00tCollectionAddress } from '@/utils/de[id]/collection'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
} from '@/utils/de[id]/image'
import Image from 'next/image'

interface User {
  image?: string
  name: string
  socials: {
    twitterHandle: string
  }
  languages?: {
    id: number
    name: string
  }[]
  collections?: {
    id: number
    contract: string
    tokens: {
      id: number
      tokenId: number
    }[]
  }[]
}

export default function UserPopUp({ user }: { user: User }) {
  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl w-full p-3 items-center content-center'>
      <div className='flex gap-3 justify-between place-self-center align-middle self-center content-center w-full'>
        <Link href={`/${user.socials.twitterHandle}`}>
          <Image
            src={user.image || 'temp/avatar.png'}
            alt={'Testing'}
            width={50}
            height={50}
            className='rounded-full self-center content-center'
            unoptimized
          />
        </Link>

        <div className='flex text-primary flex-col'>
          <Link href={`/${user.socials.twitterHandle}`}>
            <span className='font-lucky'>{user.name}</span>
          </Link>
          <Link href={`/${user.socials.twitterHandle}`}>
            <span className='font-lucky'>@{user.socials.twitterHandle}</span>
          </Link>
        </div>
      </div>

      <Divider />

      <div className='flex gap-3'>
        {user?.languages?.map((language) => (
          <Chip key={language.id} variant='shadow' color='success'>
            {language.name}
          </Chip>
        ))}
      </div>

      <div className='flex flex-row w-full overflow-x-scroll gap-6 '>
        {user?.collections?.map((collection) => (
          <div key={collection.id} className='flex flex-col gap-1'>
            <p className='font-bold text-black'>
              {isY00tCollectionAddress(collection.contract)
                ? 'y00ts'
                : 'DeGods'}
            </p>
            <div className='flex flex-row gap-6'>
              {collection.tokens.map((token) => (
                <div key={token.id} className='flex flex-col gap-1'>
                  <p className='text-black'>{token.tokenId}</p>
                  <Image
                    src={
                      isY00tCollectionAddress(collection.contract)
                        ? generateY00tsImageUrl(token.tokenId, 64, 100)
                        : generateDeGodsImageUrl(token.tokenId, 64, 100)
                    }
                    unoptimized
                    alt='Avatar'
                    className='rounded-xl min-w-16 min-h-16'
                    width={64}
                    height={64}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 flex gap-6'>
        <Button
          className='bg-transparent border-2 border-black text-black text-xs'
          as={Link}
          href={`https://x.com/${user?.socials?.twitterHandle}`}
          target='_blank'
        >
          <Image
            src='/icons/twitter.svg'
            alt='Add Icon'
            width={24}
            className='text-primary'
            height={24}
            unoptimized
          />
          {`X`}
        </Button>
        <Button className='bg-transparent border-2 border-black text-black text-xs'>
          <Image
            src='/icons/discord.svg'
            alt='Add Icon'
            width={24}
            height={24}
            unoptimized
          />
          {'Discord'}
        </Button>
      </div>
    </div>
  )
}
