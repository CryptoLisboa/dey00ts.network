import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

export default function GenderSignUp() {
  return (
    <main className='dark  overflow-hidden' id='gender'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/2_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <div className='text-center grid justify-items-center gap-y-40 px-5 md:px-10 pt-12'>
          <h1 className='text-3xl font-bold text-white text-center'>
            Connect your DeID
          </h1>
          {/* <div className='mx-16'> */}
          <Button
            className='text-white text-center text-2xl md:text-3xl shadow-md shadow-white w-full h-8 flex items-center justify-between px-20'
            // className='bg-[#212121] text-white text-center text-2xl md:text-3xl shadow-md shadow-white w-full h-8 flex items-center justify-between mx-24 px-20'
            variant='shadow'
            size='sm'
          >
            <p>Connect</p>
            <Image
              src='/images/buttons/de_id.svg'
              alt='de_id'
              width={64}
              height={64}
            />
          </Button>
          {/* </div> */}
        </div>
      </div>
    </main>
  )
}
