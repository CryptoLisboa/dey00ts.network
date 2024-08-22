'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import NextImage from 'next/image'
import Link from 'next/link'
import SignOutSVG from '@/components/svg/sign-out'
import EditSVG from '@/components/svg/edit'
import ProfileSVG from '@/components/svg/profile'
import { Socials, User } from '@prisma/client'
import { useMemo } from 'react'

interface MenuNavbarProps {
  session: Session
  user: (User & { socials: Socials | null }) | null
}

const getMenuItems = (
  user: (User & { socials: Socials | null }) | null
): { label: string; href: string }[] => [
  { label: 'Profile', href: `/${user?.socials?.twitterHandle}` },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Activity', href: '/activity' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'System', href: '/system' },
  { label: 'Deployments', href: '/deployments' },
  { label: 'My Settings', href: '/my-settings' },
  { label: 'Team Settings', href: '/team-settings' },
  { label: 'Help & Feedback', href: '/help-feedback' },
  { label: 'Log Out', href: '/log-out' },
]

export default function MenuNavbarMobile({ session, user }: MenuNavbarProps) {
  const menuItems = useMemo(() => getMenuItems(user), [user])
  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          as={NextImage}
          src={session?.user?.image || '/temp/avatar.png'}
          className='cursor-pointer rounded-full border-2 border-primary-500'
          alt='Logo'
          width={42}
          height={42}
          unoptimized
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Avatar menu'>
        <DropdownItem
          key='my-profile'
          as={Link}
          href={`/${user?.socials?.twitterHandle}`}
        >
          <div className='flex flex-row items-center gap-3'>
            <ProfileSVG />
            My Profile
          </div>
        </DropdownItem>
        <DropdownItem key='edit' as={Link} href='/profile/edit'>
          <div className='flex flex-row items-center gap-3'>
            <EditSVG />
            Edit Profile
          </div>
        </DropdownItem>
        <DropdownItem key='delete' className='text-danger' color='danger'>
          <div
            className='flex flex-row items-center gap-3'
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          >
            <SignOutSVG />
            Sign Out
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
