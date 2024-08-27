import { auth } from '@/auth'
import { UserSearchAndList } from './UserSearchAndList.client'
import { redirect } from 'next/navigation'
import { ROUTING } from '@/constants/routing.contants'

interface AppHomePageProps {
  params: any
  searchParams: {
    skills: string
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

  return (
    <div className='dark' id='root'>
      <UserSearchAndList skills={skills} />
    </div>
  )
}
