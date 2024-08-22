'use client'
import { ROUTING } from '@/constants/routing.contants'
import { Button, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CenterNavbar({
  className: classNameArg,
}: {
  className?: string
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const className = isHome ? 'hidden' : classNameArg
  return (
    <NavbarContent className={`${className}`} justify='center'>
      <NavbarItem>
        <Link href={ROUTING.APP} prefetch={true}>
          <Button color='primary' className='font-offbit font-extrabold'>
            Directory
          </Button>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={ROUTING.WORLD_MAP} prefetch={true}>
          <Button color='secondary' className='font-offbit font-extrabold'>
            World Map
          </Button>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href={ROUTING.SKIN_BUILDER} prefetch={true}>
          <Button color='warning' className='font-offbit font-extrabold'>
            Skin Builder
          </Button>
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}
