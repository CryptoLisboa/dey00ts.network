import { auth } from '@/auth'
import { Home } from '@/app/Home.client'

export default async function HomePage() {
  const session = await auth()
  return (
    <div className='dark' id='root'>
      <Home isAuthenticated={!!session} />
    </div>
  )
}
