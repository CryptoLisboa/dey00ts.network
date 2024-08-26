import { Button, Chip, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { isY00tCollectionAddress } from '@/utils/de[id]/collection'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
  getImageOfFirstToken,
} from '@/utils/de[id]/image'
import Image from 'next/image'
import ImageWithFallback from '@/components/ImageWithFallback'
import { Collection, Language, Socials, Token, User } from '@prisma/client'

export default function UserPopUp({
  user,
}: {
  user: User & {
    collections: (Collection & { tokens: Token[] })[]
    socials: Socials
    languages: Language[]
  }
}) {
  return (
    <div className='lg:w-48'>
      <div className='flex flex-col gap-3 bg-white rounded-xl w-full p-3 items-center content-center'>
        <div className='flex gap-3 justify-between place-self-center align-middle self-center content-center w-full'>
          <Link href={`/${user.socials.twitterHandle}`} className=''>
            <ImageWithFallback
              src={user.image!}
              fallback={getImageOfFirstToken(user)}
              alt={user?.name || ''}
              width={50}
              height={50}
              className='rounded-full self-center content-center'
              unoptimized
            />
          </Link>

          <div className='flex text-primary flex-col text-right'>
            <Link href={`/${user.socials.twitterHandle}`}>
              <span className='font-offbit font-bold'>{user.name}</span>
            </Link>
            <Link href={`/${user.socials.twitterHandle}`}>
              <span className='font-offbit font-bold'>
                @{user.socials.twitterHandle}
              </span>
            </Link>
          </div>
        </div>

        <Divider />

        <div className='flex gap-3 w-full justify-start flex-wrap'>
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
    </div>
  )
}
