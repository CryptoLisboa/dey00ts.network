import BgImage from '@/components/BackgroundImage'
import BackButton from '@/components/buttons/Back'
import SignUpCard from '@/components/cards/SignUp'
import { Progress, Textarea } from '@nextui-org/react'

export default function Bio() {
  return (
    <main className='dark' id='bio'>
      <BackButton />
      <BgImage
        src='/images/dey00ts_bgs/mobile/4_welcome.png'
        alt='bg'
        className='absolute'
      />
      <SignUpCard nextHref='/signup/experiences'>
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
            Tell about yourself
          </h1>
          <p className='text-base lg:text-xl text-white'>
            {
              'The request involves sharing information about oneself, allowing others to understand who they are better.'
            }
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
    </main>
  )
}
