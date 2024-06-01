'use client'
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
      <Button as={Link} href='/app' color='primary'>
        App
      </Button>
      <Button as={Link} href='/skin-builder' color='warning'>
        Skin Builder
      </Button>
    </div>
  )
}
