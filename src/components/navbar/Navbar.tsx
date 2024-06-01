'use client'
import { Image } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import NextImage from 'next/image'
import Link from 'next/link'
import MenuNavbar from '@/components/navbar/Menu.Navbar'

export const Navbar = () => {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
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

      {isAuthenticated && <MenuNavbar />}
    </nav>
  )
}
