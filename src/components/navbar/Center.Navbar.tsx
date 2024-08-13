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
  const isHome = pathname === '/'
  const className = isHome ? 'hidden' : classNameArg
  return (
    <div className={className}>
      <Link href={ROUTING.APP} prefetch={true}>
        <Button color='primary'>App</Button>
      </Link>
      <Link href={ROUTING.SKIN_BUILDER} prefetch={true}>
        <Button color='warning'>Skin Builder</Button>
      </Link>
    </div>
  )
}
