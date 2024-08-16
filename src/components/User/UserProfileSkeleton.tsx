import { Skeleton, Card } from '@nextui-org/react'

const UserProfileSkeleton = () => {
  return (
    <div className='dark' id='root'>
      <main className='container pt-0 mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-7 lg:gap-x-24 gap-16'>
          {/* Left Column */}
          <div className='lg:col-span-2 flex flex-col gap-4'>
            <Card className='flex flex-col items-center mb-8'>
              <Skeleton className='w-full h-full lg:w-full lg:h-full rounded-lg'>
                <div className='w-32 h-32 bg-default-300 rounded-lg'></div>
              </Skeleton>
            </Card>
            <div className='flex flex-col gap-1'>
              <Skeleton className='w-3/5 rounded-lg'>
                <div className='h-4 w-3/5 bg-default-300'></div>
              </Skeleton>
              <Skeleton className='w-2/5 rounded-lg'>
                <div className='h-3 w-2/5 bg-default-200'></div>
              </Skeleton>
            </div>

            <div className='flex flex-wrap gap-2'>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className='rounded-lg'>
                  <div className='h-6 w-20 bg-default-300'></div>
                </Skeleton>
              ))}
            </div>

            <Skeleton className='mt-4 text-sm w-4/5 rounded-lg'>
              <div className='h-3 w-4/5 bg-default-200'></div>
            </Skeleton>

            <Skeleton className='mt-4 w-3/5 rounded-lg'>
              <div className='h-4 w-3/5 bg-default-300'></div>
            </Skeleton>

            <div className='mt-4 flex flex-col gap-1'>
              {[...Array(2)].map((_, index) => (
                <div key={index} className='flex p-1 gap-3'>
                  <Skeleton className='rounded-lg'>
                    <div className='h-6 w-6 bg-default-200 rounded-full'></div>
                  </Skeleton>
                  <Skeleton className='w-3/5 rounded-lg'>
                    <div className='h-3 w-3/5 bg-default-300'></div>
                  </Skeleton>
                </div>
              ))}
            </div>

            <div className='mt-4 flex gap-6 flex-wrap'>
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} className='rounded-lg'>
                  <div className='h-8 w-32 bg-default-300'></div>
                </Skeleton>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className='lg:col-span-5 flex flex-col gap-8'>
            <Card className='flex flex-col gap-8 border-1 border-white rounded-3xl lg:p-8 p-4'>
              <Skeleton className='w-3/5 rounded-lg'>
                <div className='h-5 w-3/5 bg-default-300'></div>
              </Skeleton>

              {[...Array(2)].map((_, index) => (
                <div key={index} className='flex flex-col gap-6'>
                  <div className='flex flex-col gap-y-4'>
                    <Skeleton className='w-2/5 rounded-lg'>
                      <div className='h-4 w-2/5 bg-default-300'></div>
                    </Skeleton>
                    <Skeleton className='w-1/3 rounded-lg'>
                      <div className='h-3 w-1/3 bg-default-200'></div>
                    </Skeleton>
                    <Skeleton className='w-1/4 rounded-lg'>
                      <div className='h-3 w-1/4 bg-default-200'></div>
                    </Skeleton>
                  </div>
                </div>
              ))}
            </Card>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-wrap gap-6'>
                {[...Array(2)].map((_, index) => (
                  <Card
                    key={index}
                    className='lg:w-56 w-full space-y-5 p-4 mb-4'
                  >
                    <Skeleton className='rounded-lg'>
                      <div className='h-60 rounded-lg bg-default-300'></div>
                    </Skeleton>
                    <div className='space-y-3'>
                      <Skeleton className='w-4/5 rounded-lg'>
                        <div className='h-3 w-4/5 bg-default-200'></div>
                      </Skeleton>
                      <Skeleton className='w-2/5 rounded-lg'>
                        <div className='h-3 w-2/5 bg-default-300'></div>
                      </Skeleton>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserProfileSkeleton
