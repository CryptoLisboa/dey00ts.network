'use client'
import { Button, ButtonGroup, Tab, Tabs } from '@nextui-org/react'
import { DegodsBuilder } from './DegodsBuilder'
import { YootsBuilder } from './YootsBuilder'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'

function SkinBuilderComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedTab = searchParams?.get('tab') || 'DeGods'

  function handleTab(tab: string) {
    const params = new URLSearchParams(searchParams || undefined)
    if (tab) {
      params.set('tab', tab)
    } else {
      params.delete('tab')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }
  const [gridView, setGridView] = useState(true)

  return (
    <main className='pt-4'>
      <div className='flex flex-col md:flex-row gap-y-6 md:gap-y-0 w-full mb-4'>
        <div className='flex flex-1 justify-center items-center'>
          <Tabs
            aria-label='Options'
            selectedKey={selectedTab}
            onSelectionChange={(tab) => {
              handleTab(tab as string)
            }}
          >
            <Tab key='DeGods' title='DeGods' />

            <Tab key='Y00ts' title='Y00ts' />
          </Tabs>
        </div>

        <div className='flex flex-col flex-1 justify-center'>
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className='font-rowdies text-2xl md:text-4xl text-center cursor-progress'
          >
            {['S', 'k', 'i', 'n', ' ', 'B', 'u', 'i', 'l', 'd', 'e', 'r'].map(
              (el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: i / 20,
                  }}
                  key={i}
                >
                  {el}
                </motion.span>
              )
            )}
          </motion.h1>
          <h2 className='font-rowdies text-sm text-center'>
            This is a tool that allows you to customize the appearance of <br />
            DeGods and Y00ts
          </h2>
        </div>
        <div className='flex flex-1 justify-center'>
          <ButtonGroup className='my-3'>
            <Button onClick={() => setGridView(true)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
                />
              </svg>
            </Button>
            <Button onClick={() => setGridView(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='container mx-auto p-4 pb-0 md:pt-8 text-center'>
        {selectedTab === 'DeGods' && <DegodsBuilder gridView={gridView} />}

        {selectedTab === 'Y00ts' && <YootsBuilder />}
      </div>
    </main>
  )
}

export default function SkinBuilder() {
  return (
    <Suspense>
      <SkinBuilderComponent />
    </Suspense>
  )
}
