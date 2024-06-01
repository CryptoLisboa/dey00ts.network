import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from 'next/link'
import MenuNavbar from '@/components/navbar/Menu.Navbar'
import { auth } from '@/auth'
import { prisma } from '@/utils/db.utils'

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
      <Link href={'/'}>
        <Image
          as={NextImage}
          src='/images/degods-logo.png'
          alt='Logo'
          className='border-0 rounded-none'
          width={84}
          height={84}
        />
      </Link>

      {session && <MenuNavbar session={session} user={user} />}
    </nav>
  )
}
