import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

type DisplaySingleTraitProps = {
  src: string
  trait: string
  onLeftClick: () => void
  onRightClick: () => void
}

export const DisplaySingleTrait = ({
  src,
  trait,
  onLeftClick,
  onRightClick,
}: DisplaySingleTraitProps) => {
  return (
    <div className='flex flex-col self-center'>
      <h3 className='text-lg font-bold'>{trait}</h3>
      <div className='flex mt-3 items-center'>
        <button className='mr-3' onClick={onLeftClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
            />
          </svg>
        </button>
        <Image
          className='border-1 border-gray-400'
          as={NextImage}
          src={src}
          alt='Skin Builder'
          width={220}
          height={220}
        />
        <button className='ml-3' onClick={onRightClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
