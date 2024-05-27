'use client'
import {
  Button,
  ButtonGroup,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicDegodsBuilder = dynamic(() =>
  import('./Degods/DegodsBuilder').then((mod) => mod.DegodsBuilder)
)
const DynamicYootsBuilder = dynamic(() =>
  import('./Yoots/YootsBuilder').then((mod) => mod.YootsBuilder)
)
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

  function handleGrid(tab: string) {
    const params = new URLSearchParams(searchParams || undefined)
    if (tab) {
      params.set('grid', tab)
    } else {
      params.delete('grid')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure()
  const selectedGrid = searchParams?.get('grid') || 'true'

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
          <Link className='underline' href='/skin-builder'>
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
          </Link>
          <h2 className='font-rowdies text-sm text-center'>
            This is a tool that allows you to customize the appearance of <br />
            DeGods and Y00ts
          </h2>
        </div>
        <div className='flex flex-1 justify-center'>
          <ButtonGroup className='my-3'>
            <Button
              className={`${
                selectedGrid === 'false' ? 'bg-[#212121]' : 'bg-[#D9D9D9]'
              }`}
              onClick={() => handleGrid('true')}
            >
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
            <Button
              className={`${
                selectedGrid === 'true' ? 'bg-[#212121]' : 'bg-[#D9D9D9]'
              }`}
              onClick={() => handleGrid('false')}
            >
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
            <Button
              className={`border-l-1 border-gray-300
              ${selectedGrid === 'true' ? 'bg-[#212121]' : 'bg-[#D9D9D9]'}`}
              onClick={onOpenSettings}
            >
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
                  d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='container mx-auto p-4 pb-0 md:pt-8 text-center'>
        {selectedTab === 'DeGods' && (
          <DynamicDegodsBuilder
            gridView={selectedGrid === 'true'}
            isOpenSettings={isOpenSettings}
            onCloseSettings={onCloseSettings}
          />
        )}

        {selectedTab === 'Y00ts' && (
          <DynamicYootsBuilder gridView={selectedGrid === 'true'} />
        )}
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
