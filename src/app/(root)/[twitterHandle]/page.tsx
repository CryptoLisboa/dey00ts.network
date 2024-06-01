import { prisma } from '@/app/utils/db'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import { Image } from '@nextui-org/react'
import {
  hasDeGodsNFTs,
  hasY00tsNFTs,
  isY00tCollectionAddress,
} from '@/utils/de[id]/collection'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
} from '@/utils/de[id]/image'

export default async function HomePage(ctx: any) {
  const twitterHandle = ctx.params.twitterHandle

  const user = await prisma.user.findFirst({
    where: {
      socials: {
        twitterHandle: {
          mode: 'insensitive',
          equals: twitterHandle,
        },
      },
    },
    include: {
      socials: true,
      profile: true,
      location: true,
      languages: true,
      userExperiences: {
        include: {
          experience: {
            include: {
              skill: true,
            },
          },
        },
      },
      collections: {
        include: {
          tokens: true,
        },
      },
    },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className='dark' id='root'>
      <main className='container pt-0 mx-auto p-4'>
        <div className='flex flex-col items-center mb-4'>
          <Image
            as={NextImage}
            src={user?.image || '/temp/avatar-square-image.png'}
            alt='Avatar'
            className='rounded-full w-56 h-56'
            width={224}
            height={224}
          />
          <p className='text-sm font-bold text-gray-400'>
            {user?.socials?.twitterHandle}
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
            <p>{user?.location?.name}</p>
          </div>
          <div className='flex p-1 gap-3'>
            <Image
              as={NextImage}
              src='/icons/message.svg'
              alt='Location Icon'
              width={24}
              height={24}
            />
            {user?.languages?.map((language) => (
              <p key={language.id}>{language.name}</p>
            ))}
          </div>
        </div>

        <h3 className='mt-4 text-lg font-bold'>Bio</h3>
        <p className='text-sm '>{user.profile?.bio || 'No bio available'}</p>

        <h3 className='mt-4 text-lg font-bold'>Experiences</h3>
        {user.userExperiences.map((experience) => (
          <div key={experience.experience.id} className='flex flex-col gap-1'>
            <div className='flex flex-row flex-wrap'>
              <p className='font-bold'>{experience.experience.company}</p>
              <p className=''>{`: ${experience.experience.role}`}</p>
            </div>
            <p className=''>{`description: ${experience.experience.description}`}</p>
            <p className='text-sm'>{`base skill: ${experience.experience.skill.name}`}</p>
            <p className='text-sm'>
              {new Date(experience.experience.startDate).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }
              )}{' '}
              -{' '}
              {experience.experience.current
                ? 'current'
                : new Date(
                    experience.experience?.endDate as Date
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
            </p>
          </div>
        ))}

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
          {hasY00tsNFTs(user) && <p className='font-bold'>y00ts</p>}
          {hasDeGodsNFTs(user) && <p className='font-bold'>DeGods</p>}
        </div>

        <h3 className='mt-4 text-lg font-bold'>NFTs</h3>
        <div className='flex flex-wrap gap-6'>
          {user.collections.map(
            (collection: {
              id: number
              contract: string
              tokens: { id: number; tokenId: number }[]
            }) => (
              <div key={collection.id} className='flex flex-col gap-1'>
                <p className='font-bold'>
                  {isY00tCollectionAddress(collection.contract)
                    ? 'y00ts'
                    : 'DeGods'}
                </p>
                <div className='flex flex-wrap gap-6'>
                  {collection.tokens.map(
                    (token: { id: number; tokenId: number }) => (
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
                    )
                  )}
                </div>
              </div>
            )
          )}
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
            {user.socials?.discordUsername}
          </Button>

          <Button
            className='bg-transparent border-1 border-[#D9D9D980] text-white'
            as={Link}
            href={`https://twitter.com/${user.socials?.twitterHandle}`}
            target='_blank'
          >
            <Image
              as={NextImage}
              src='/icons/twitter.svg'
              alt='Add Icon'
              width={24}
              height={24}
            />
            {`twitter.com/${user.socials?.twitterHandle}`}
          </Button>
        </div>
      </main>
    </div>
  )
}
