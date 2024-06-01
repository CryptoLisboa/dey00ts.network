import { auth } from '@/auth'
import { Home } from '@/app/Home.client'

export default async function HomePage(ctx) {
  const session = await auth()

  console.log({ ctx })
  return (
    <div className='dark' id='root'>
      <Home isAuthenticated={!!session} />
    </div>
  )
}
