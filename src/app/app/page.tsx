import { auth } from '@/auth'
import { UserList } from './UserList.client'
import { redirect } from 'next/navigation'
import { prisma } from '@/utils/db.utils'

export default async function AppHomePage() {
  const session = await auth()

  if (session && !session?.user?.active) redirect('/signup/welcome')

  const users = await prisma.user.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
    skip: 0,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      website: true,
      createdAt: true,
      updatedAt: true,
      socials: {
        select: {
          id: true,
          twitterHandle: true,
        },
      },
      location: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  return (
    <div className='dark' id='root'>
      <UserList users={users} />
    </div>
  )
}
