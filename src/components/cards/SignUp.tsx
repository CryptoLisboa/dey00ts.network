import { Button, Link as NextUILink } from '@nextui-org/react'
import Link from 'next/link'

export default function SignUpCard({
  children,
  nextHref,
  onClick,
}: {
  children?: React.ReactNode
  nextHref?: string
  onClick?: () => void
}) {
  return (
    <div className='grid grid-rows-12 gap-y-10 md:h-5/6 px-5 md:px-10 pt-12 content-center justify-center'>
      <div className='row-span-9'>{children}</div>
      <div className='row-span-3 self-center grid gap-y-2 lg:gap-y-8 justify-center'>
        {onClick ? (
          <Button
            className='bg-black w-full text-white text-sm md:text-3xl shadow-md shadow-white custom-shadow'
            variant='shadow'
            onClick={onClick}
          >
            Next
          </Button>
        ) : (
          <Button
            className='bg-black w-full text-white text-sm md:text-3xl shadow-md shadow-white custom-shadow'
            variant='shadow'
            as={Link}
            href={nextHref}
          >
            Next
          </Button>
        )}
        <NextUILink
          as={Link}
          href='#'
          className='text-white text-center md:text-base text-sm'
          underline='hover'
        >
          already part of Dey00ts Network? log in instead
        </NextUILink>
      </div>
    </div>
  )
}
