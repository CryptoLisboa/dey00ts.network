import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import { EditForm } from './EditForm.client'
import { auth } from '@/auth'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import LoginButton from '@/components/buttons/LoginButton'
import { ROUTING } from '@/constants/routing.contants'

export default async function EditProfilePage() {
  const session = await auth()

  if (!session) {
    return (
      <main className='flex flex-col items-center justify-center h-[85vh]'>
        <h1 className='font-lucky text-4xl md:text-6xl uppercase'>
          Not Connected
        </h1>

        <div className='flex flex-wrap items-center gap-12 mt-6 font-lucky'>
          <Link href={ROUTING.APP} prefetch={true}>
            <Button color='primary'>Directory</Button>
          </Link>
          <Link href='/signup/connect_de_id' prefetch={true}>
            <Button color='secondary'>Sign Up</Button>
          </Link>
          <LoginButton />
        </div>
      </main>
    )
  }

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
