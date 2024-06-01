import { Button, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from 'next/link'
import {
  generateDeGodsImageUrl,
  generateY00tsImageUrl,
} from '@/utils/de[id]/image'
import {
  hasDeGodsNFTs,
  hasY00tsNFTs,
  isY00tCollectionAddress,
} from '@/utils/de[id]/collection'
import { UserCreated } from '@/types/app.types'
import { prisma } from '@/utils/db.utils'
import { auth } from '@/auth'

const fetchProfile = async (): Promise<UserCreated> => {
  try {
    const session = await auth()

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        profile: true,
        location: true,
        contents: true,
        userExperiences: {
          include: {
            experience: {
              include: {
                skill: true,
              },
            },
          },
        },
        dust: true,
        socials: true,
        wallets: true,
        followers: {
          include: {
            follower: true,
          },
        },
        followings: {
          include: {
            following: true,
          },
        },
        collections: {
          include: {
            tokens: true,
          },
        },
      },
    })

    const data = user as UserCreated
    return data
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error // Re-throw to handle it at a higher level if necessary
  }
}

export default async function Profile() {
  const user = (await fetchProfile()) as UserCreated

  console.log('fetching profile', JSON.stringify(user, null, 2))

  return (
    <main className='container pt-0 mx-auto p-4'>
      <div className='flex flex-col items-center mb-4'>
        <Image
          as={NextImage}
          src={user.image}
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
      {user.userExperiences.map((experience) => (
        <div key={experience.experience.id} className='flex flex-col gap-1'>
          <p className=''>{experience.experience.description}</p>
          <p className='text-sm'>{experience.experience.skill.name}</p>
          <p className='text-sm'>
            {String(experience.experience.startDate)} -{' '}
            {experience.experience.current
              ? 'current'
              : String(experience.experience.endDate)}
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
  )
}

/*
fetching profile {
  "id": "clwq6zj1e0002k9zyn4qfot8b",
  "email": "wains-perk0c@icloud.com",
  "name": "Ben",
  "bio": null,
  "createdAt": "2024-05-28T09:25:36.674Z",
  "emailVerified": null,
  "updatedAt": "2024-06-01T08:00:57.117Z",
  "externalId": "ad5b1e5f-b296-4df6-9a91-7d4441aa0f17",
  "website": null,
  "image": "https://pbs.twimg.com/profile_images/1791145190616363013/SltNT6u-.jpg",
  "active": true,
  "genderId": 1,
  "locationId": 53,
  "profile": {
    "id": 1,
    "userId": "clwq6zj1e0002k9zyn4qfot8b",
    "bio": "software engineer // web3 degen @lisbonlabs\n@dealphaxyz operations\n\nDM 💌 for dev work https://github.com/CryptoLisboa",
    "avatarUrl": null
  },
  "location": {
    "id": 53,
    "name": "Portugal",
    "description": null,
    "latitude": null,
    "longitude": null,
    "value": "pt"
  },
  "contents": [],
  "userExperiences": [
    {
      "userId": "clwq6zj1e0002k9zyn4qfot8b",
      "experienceId": 3
    }
  ],
  "dust": {
    "id": 1,
    "userId": "clwq6zj1e0002k9zyn4qfot8b",
    "amount": 26,
    "preciseAmount": "26907897293",
    "decimals": 9
  },
  "socials": {
    "id": 1,
    "userId": "clwq6zj1e0002k9zyn4qfot8b",
    "telegramId": null,
    "telegramUsername": null,
    "discordId": "613126953829924896",
    "discordUsername": "Ben.Eth.Miner#0001",
    "twitterId": "942220335264550912",
    "twitterHandle": "CryptoLisboa",
    "twitterUsername": null
  },
  "wallets": [
   ...
  ],
  "followers": [],
  "followings": [],
  "collections": [
    ...
  ]
}
*/
