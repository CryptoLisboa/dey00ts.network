'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function BackButton({
  disabled = false,
}: {
  disabled?: boolean
}) {
  const router = useRouter()
  const routeToPreviousPage = () => router.back()
  const enabled = !disabled
  return (
    <div
      className='relative w-8 h-8 mt-14 ml-8 pointer-events-auto cursor-pointer'
      onClick={enabled ? routeToPreviousPage : undefined}
    >
      <Image
        src='/images/buttons/back.svg'
        alt='bg'
        fill
        style={{
          objectFit: 'contain',
        }}
        unoptimized
      />
    </div>
  )
}
