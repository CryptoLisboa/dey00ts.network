import { Card, Skeleton } from '@nextui-org/react'

export default function EditProfileSkeleton() {
  return (
    <div className='container mx-auto h-full px-12 sm:px-24 md:px-32 lg:px-96'>
      <Card className='space-y-5 p-4 mb-4' radius='lg'>
        <Skeleton className='rounded-lg'>
          <div className='h-10 rounded-lg bg-default-300'></div>
        </Skeleton>

        {/* Location Section */}
        <div className='space-y-3'>
          <Skeleton className='w-4/5 rounded-lg'>
            <div className='h-6 rounded-lg bg-default-300'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-10 w-full rounded-lg bg-default-300'></div>
          </Skeleton>
        </div>

        {/* Language Section */}
        <div className='space-y-3'>
          <Skeleton className='w-4/5 rounded-lg'>
            <div className='h-6 rounded-lg bg-default-300'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-10 w-full rounded-lg bg-default-300'></div>
          </Skeleton>
        </div>

        {/* Bio Section */}
        <div className='space-y-3'>
          <Skeleton className='w-4/5 rounded-lg'>
            <div className='h-6 rounded-lg bg-default-300'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='h-24 w-full rounded-lg bg-default-300'></div>
          </Skeleton>
        </div>

        {/* Gender Section */}
        <div className='space-y-3'>
          <Skeleton className='w-4/5 rounded-lg'>
            <div className='h-6 rounded-lg bg-default-300'></div>
          </Skeleton>
          <div className='flex flex-wrap gap-3'>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-10 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-10 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-10 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-10 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
          </div>
        </div>

        {/* Skills Section */}
        <div className='space-y-3'>
          <Skeleton className='w-4/5 rounded-lg'>
            <div className='h-6 rounded-lg bg-default-300'></div>
          </Skeleton>
          <div className='flex flex-wrap gap-4'>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-8 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-8 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-8 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
            <Skeleton className='w-1/4 rounded-lg'>
              <div className='h-8 w-full rounded-lg bg-default-300'></div>
            </Skeleton>
          </div>
        </div>

        {/* Save Button */}
        <div className='flex justify-center'>
          <Skeleton className='w-1/2 rounded-lg'>
            <div className='h-12 rounded-lg bg-default-300'></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  )
}
