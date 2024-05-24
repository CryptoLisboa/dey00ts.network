import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Progress, Textarea } from '@nextui-org/react'

export default function Experiences() {
  return (
    <main className='dark' id='experiences'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
        alt='bg'
        className='absolute'
      />
      <div className='container mx-auto h-full sm:px-24 md:px-32 lg:px-96'>
        <SignUpCard>
          <div className='text-center grid justify-items-center gap-y-5'>
            <Progress
              size='sm'
              radius='sm'
              classNames={{
                base: 'px-16',
                indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
              }}
              value={(100 / 6) * 4}
            />
            <h1 className='text-3xl font-bold text-white text-center'>
              Share your experience
            </h1>
            <p className='text-base lg:text-xl text-white'>
              This helps us find more relevant content.
            </p>
            <Textarea
              key='bordered'
              variant='bordered'
              placeholder='type here'
              className='text-[#D9D9D9] border-[#AFE5FF] h-full'
              size='lg'
              minRows={5}
            />
          </div>
        </SignUpCard>
      </div>
    </main>
  )
}
