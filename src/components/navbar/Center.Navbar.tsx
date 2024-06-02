'use client'
import { ROUTING } from '@/constants/routing.contants'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CenterNavbar({
  className: classNameArg,
}: {
  className?: string
}) {
  const pathname = usePathname()
  console.log('pathname:', pathname)
  const isHome = pathname === '/'
  const className = isHome ? 'hidden' : classNameArg
  return (
    <div className={className}>
      <Button as={Link} href={ROUTING.APP} color='primary'>
        App
      </Button>
      <Button as={Link} href={ROUTING.SKIN_BUILDER} color='warning'>
        Skin Builder
      </Button>
    </div>
  )
}
