import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import Link from 'next/link'
import MenuNavbar from '@/components/navbar/Menu.Navbar'
import { auth } from '@/auth'
import { prisma } from '@/utils/db.utils'
import LoginButton from '@/components/buttons/LoginButton'
import CenterNavbar from '@/components/navbar/Center.Navbar'
import { ROUTING } from '@/constants/routing.contants'
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react'
import { Socials, User } from '@prisma/client'
import MenuNavbarMobile from '@/components/navbar/Menu.Navbar.Mobile'

export const Navbar = async () => {
  const session = await auth()
  let user: (User & { socials: Socials | null }) | null = null
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      include: { socials: true },
    })
  }
  return (
    <NextUINavbar className='py-1.5 md:py-3' maxWidth='full'>
      <NavbarBrand className='flex'>
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
      </NavbarBrand>

      <CenterNavbar className='hidden md:flex gap-x-8' />

      <NavbarContent className='hidden md:flex' justify='end'>
        {session ? (
          <MenuNavbar session={session} user={user} />
        ) : (
          <LoginButton />
        )}
      </NavbarContent>
      <NavbarContent className='flex md:hidden' justify='end'>
        {session ? (
          <MenuNavbarMobile session={session} user={user} />
        ) : (
          <LoginButton />
        )}
      </NavbarContent>
    </NextUINavbar>
  )
}
