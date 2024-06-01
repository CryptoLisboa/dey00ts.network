import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from 'next/link'
import MenuNavbar from '@/components/navbar/Menu.Navbar'
import { auth } from '@/auth'

export const Navbar = async () => {
  const session = await auth()
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

      {session && <MenuNavbar />}
    </nav>
  )
}
