import { auth } from '@/auth'
import { UserList } from './UserList.client'
import { redirect } from 'next/navigation'
import { prisma } from '@/utils/db.utils'
import { SEARCH_PAGE_SIZE } from '@/constants/app.constants'
import { ROUTING } from '@/constants/routing.contants'

interface AppHomePageProps {
  params: any
  searchParams: {
    skills: string
    page: string
  }
}

export default async function AppHomePage(ctx: AppHomePageProps) {
  const session = await auth()

  if (session && !session?.user?.active) redirect(ROUTING.SIGNUP.WELCOME)

  const skills =
    ctx.searchParams.skills
      ?.split(',')
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(Number(id))) || []
  const page = ctx.searchParams.page
    ? parseInt(ctx.searchParams.page, SEARCH_PAGE_SIZE)
    : 1
  const skipAmount = (page - 1) * SEARCH_PAGE_SIZE

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
      socials: {
        twitterHandle: {
          not: null,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: SEARCH_PAGE_SIZE,
    skip: skipAmount,
    select: {
      id: true,
      name: true,
      image: true,
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
      <UserList users={users} skills={skills} page={page} />
    </div>
  )
}
