'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import { Image, Button } from '@nextui-org/react'
import { isY00tCollectionAddress } from '@/utils/de[id]/collection'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
} from '@/utils/de[id]/image'
import { getSkillButtonStyles } from '@/utils/button'
import SkillButton from '@/components/buttons/SkillButton'
import useSWR from 'swr'
import { fetcher } from '@/utils/services'
import UserProfileSkeleton from '@/components/User/UserProfileSkeleton'

const getUserLocationName = (user: any) => {
  let locationName = ''
  if (user?.location?.country?.name) {
    locationName = user?.location?.country?.name
  }
  if (user?.location?.state?.name) {
    locationName = `${user?.location?.state?.name}, ${locationName}`
  }
  if (user?.location?.city?.name) {
    locationName = `${user?.location?.city?.name}, ${locationName}`
  }
  if (locationName === '') {
    locationName = user?.location?.name
  }

  return locationName
}

export default function ProfilePage({
  twitterHandle,
}: {
  twitterHandle: string
}) {
  const {
    data: user,
    isLoading: isUserLoading,
    mutate,
  } = useSWR(`/api/user/search/${twitterHandle}`, fetcher)

  if (isUserLoading) {
    return <UserProfileSkeleton />
  }

  if (!user) {
    notFound()
  }

  return (
    <div className='dark' id='root'>
      <main className='container pt-0 mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-7 lg:gap-x-24 gap-16'>
          <div className='lg:col-span-2 flex flex-col gap-4'>
            <div className='flex flex-col items-center mb-8'>
              <div
                className='w-full h-full lg:w-full lg:h-full py-0.5 px-0.5 rounded-lg'
                style={{
                  background:
                    'radial-gradient(circle, #0049FF 0%, #01AE6A 20%, #0199FF 40%, #E7B114 62%, #E83847 82%, #6401FF 100%)',
                }}
              >
                <div className='w-full h-full lg:w-full lg:h-full rounded-lg bg-black'>
                  <NextImage
                    className='rounded-lg w-full h-full object-cover aspect-square'
                    src={user?.image}
                    width={128}
                    height={128}
                    alt={`${user?.name}`}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-xl font-bold font-offbit'>@{user?.name}</p>
              <p className='text-xs font-bold text-gray-400 font-argent'>
                @{user?.socials?.twitterHandle}
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {user.skills.map((skill: { id: number; name: string }) => (
                <SkillButton key={skill.id} id={skill.id} name={skill.name} />
              ))}
            </div>

            <p className='text-sm '>
              {user.profile?.bio || 'No bio available'}
            </p>

            <h3 className='mt-4 text-lg text-full-stack font-bold'>
              {user?.skills?.length > 0
                ? user?.skills[0]?.name
                : `mandem don't share much`}
            </h3>
            <div className='flex flex-col gap-1'>
              <div className='flex p-1 gap-3'>
                <Image
                  as={NextImage}
                  src='/icons/location.svg'
                  alt='Location Icon'
                  width={24}
                  height={24}
                  unoptimized
                />
                <p>{`${getUserLocationName(user)}`}</p>
              </div>
              <div className='flex p-1 gap-3'>
                <Image
                  as={NextImage}
                  src='/icons/message.svg'
                  alt='Location Icon'
                  width={24}
                  height={24}
                  unoptimized
                />
                {user?.languages?.map(
                  (language: { id: number; name: string }) => (
                    <p key={language.id}>{language.name}</p>
                  )
                )}
              </div>
            </div>

            <div className='mt-4 flex gap-6 flex-wrap'>
              {!!user.socials?.discordUsername && (
                <Button className='bg-transparent border-1 border-[#D9D9D980] text-white w-fit'>
                  <Image
                    as={NextImage}
                    src='/icons/discord.svg'
                    alt='Add Icon'
                    width={24}
                    height={24}
                    unoptimized
                  />
                  {user.socials?.discordUsername}
                </Button>
              )}

              {!!user.socials?.twitterHandle && (
                <Button
                  className='bg-transparent border-1 border-[#D9D9D980] text-white'
                  as={Link}
                  href={`https://x.com/${user.socials?.twitterHandle}`}
                  target='_blank'
                >
                  <Image
                    as={NextImage}
                    src='/icons/twitter.svg'
                    alt='Add Icon'
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <p className=''>{`${user.socials?.twitterHandle}`}</p>
                </Button>
              )}

              {!!user.socials?.telegramUsername && (
                <Button
                  className='bg-transparent border-1 border-[#D9D9D980] text-white'
                  as={Link}
                  href={`https://t.me/${user.socials?.telegramUsername}`}
                  target='_blank'
                >
                  <Image
                    as={NextImage}
                    src='/icons/message.svg'
                    alt='Add Icon'
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <p className=''>{`${user.socials?.telegramUsername}`}</p>
                </Button>
              )}
            </div>
          </div>
          <div className='lg:col-span-5 flex flex-col gap-8'>
            <div
              className='rounded-3xl px-0.5 py-0.5'
              style={{
                background:
                  'radial-gradient(circle, #0049FF 0%, #01AE6A 20%, #0199FF 40%, #E7B114 62%, #E83847 82%, #6401FF 100%)',
              }}
            >
              <div className='flex flex-col gap-8 border-1 border-white rounded-3xl lg:p-8 p-4 bg-black'>
                <h3 className='text-2xl font-bold'>Things this DeGod did</h3>
                {user.userExperiences.map(
                  (experience: {
                    experience: {
                      id: number
                      company: string
                      role: string
                      startDate: Date
                      endDate: Date
                      current: boolean
                      description: string
                      skill: { id: number; name: string }
                    }
                  }) => (
                    <div
                      key={experience.experience.id}
                      className='flex flex-col gap-6'
                    >
                      <div className='flex flex-col gap-y-4'>
                        <div className='flex flex-col gap-y-0.5'>
                          <p className='font-bold text-lg'>
                            {experience.experience.company}
                          </p>
                          <div className='flex flex-row gap-x-2'>
                            <p className='text-sm'>{`${experience.experience.role} // `}</p>
                            <p className='text-xs flex items-center'>
                              {new Date(
                                experience.experience.startDate
                              ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                              })}{' '}
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
                        </div>
                        <Button
                          className='bg-transparent border-1 border-full-stack text-sm w-fit'
                          style={getSkillButtonStyles(
                            experience.experience.skill.name
                          )}
                          size='sm'
                        >
                          {experience.experience.skill.name}
                        </Button>
                      </div>
                      <p className=''>{`${experience.experience.description}`}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className='flex flex-col gap-4'>
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
                            <div
                              key={token.id}
                              className='flex flex-col w-1/3 lg:w-fit gap-1'
                            >
                              <p>{token.tokenId}</p>
                              <div
                                className='w-full h-full lg:w-56 lg:h-56 py-0.5 px-0.5 rounded-3xl'
                                style={{
                                  background:
                                    'radial-gradient(circle, #0049FF 0%, #01AE6A 20%, #0199FF 40%, #E7B114 62%, #E83847 82%, #6401FF 100%)',
                                }}
                              >
                                <NextImage
                                  className='rounded-3xl w-full h-full object-cover aspect-square'
                                  src={
                                    isY00tCollectionAddress(collection.contract)
                                      ? generateY00tsImageUrl(
                                          token.tokenId,
                                          224,
                                          100
                                        )
                                      : generateDeGodsImageUrl(
                                          token.tokenId,
                                          224,
                                          100
                                        )
                                  }
                                  width={128}
                                  height={128}
                                  alt={`${user?.name}`}
                                  unoptimized
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
