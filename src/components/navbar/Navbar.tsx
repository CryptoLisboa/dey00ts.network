import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from 'next/link'
import MenuNavbar from '@/components/navbar/Menu.Navbar'
import { auth } from '@/auth'
import { prisma } from '@/utils/db.utils'
import LoginButton from '../buttons/LoginButton'
import CenterNavbar from './Center.Navbar'
import { ROUTING } from '@/constants/routing.contants'

export const Navbar = async () => {
  const session = await auth()
  let user
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      include: { socials: true },
    })
  }
  return (
    <nav className='flex items-center justify-between p-3 md:p-6'>
      <Link href={ROUTING.HOME} prefetch={true}>
        <Image
          as={NextImage}
          src='/images/degods-logo.png'
          alt='Logo'
          className='border-0 rounded-none'
          width={84}
          height={84}
          unoptimized
        />
      </Link>

      <CenterNavbar className='hidden md:flex gap-x-8 font-lucky' />

      {session ? <MenuNavbar session={session} user={user} /> : <LoginButton />}
    </nav>
  )
}
