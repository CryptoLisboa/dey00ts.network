import { auth } from '@/auth'
import { UserList } from './UserList.client'
import { redirect } from 'next/navigation'
import { prisma } from '@/utils/db.utils'

interface AppHomePageProps {
  params: any
  searchParams: {
    skills: string
  }
}

export default async function AppHomePage(ctx: AppHomePageProps) {
  const session = await auth()

  console.log('session 123', JSON.stringify(session, null, 2))

  if (session && !session?.user?.active) redirect('/signup/welcome')

  const skills =
    ctx.searchParams.skills
      ?.split(',')
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(Number(id))) || []

  const users = await prisma.user.findMany({
    where: {
      active: true,
      ...(skills && skills.length > 0
        ? {
            skills: {
              some: {
                id: {
                  in: skills,
                },
              },
            },
          }
        : {}),
    },
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
      <UserList users={users} skills={skills} />
    </div>
  )
}
