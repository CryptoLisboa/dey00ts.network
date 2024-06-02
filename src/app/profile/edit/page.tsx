import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import { EditForm } from './EditForm.client'
import { auth } from '@/auth'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import LoginButton from '@/components/buttons/LoginButton'

export default async function EditProfilePage() {
  const session = await auth()

  if (!session) {
    return (
      <main className='flex flex-col items-center justify-center h-[85vh]'>
        <h1 className='font-lucky text-4xl md:text-6xl uppercase'>
          Not Connected
        </h1>

        <div className='flex flex-wrap items-center gap-12 mt-6 font-lucky'>
          <Button as={Link} href='/app' color='primary'>
            App
          </Button>
          <Button as={Link} href='/signup/connect_de_id' color='secondary'>
            Sign Up
          </Button>
          <LoginButton />
        </div>
      </main>
    )
  }

  console.log({ session })
  return (
    <main className='dark overflow' id='experiences'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/overall_bg.png'
        alt='bg'
        className='absolute'
      />
      <EditForm user={session.user} />
    </main>
  )
}
