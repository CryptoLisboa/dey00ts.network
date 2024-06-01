import { auth } from '@/auth'
import { Home } from '@/app/Home.client'
import { prisma } from '@/app/utils/db'

export default async function HomePage(ctx) {
  const session = await auth()

  const twitterHandle = ctx.params.twitterHandle

  const user = await prisma.user.findFirst({
    where: {
      socials: { twitterHandle: twitterHandle },
    },
  })

  console.log({ ctx, user })
  return (
    <div className='dark' id='root'>
      {user?.name}
    </div>
  )
}
