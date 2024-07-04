import { ROUTING } from '@/constants/routing.contants'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex justify-center flex-col w-full items-center align-middle h-[85vh]'>
      <div className='flex justify-center flex-col w-1/2 gap-8 items-center'>
        <h2 className='text-center uppercase font-lucky'>Not Found</h2>
        <Link href={ROUTING.HOME} prefetch={true}>
          <Button
            variant='ghost'
            color='primary'
            className='w-1/2 justify-center'
          >
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
