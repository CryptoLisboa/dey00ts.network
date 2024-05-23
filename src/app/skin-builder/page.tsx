'use client'
import { Tab, Tabs } from '@nextui-org/react'
import { DegodsBuilder } from './DegodsBuilder'
import { YootsBuilder } from './YootsBuilder'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { YOOTSMAPPER } from '@/constants/yootsMapper'
import { Suspense } from 'react'

// Remove the duplicate declaration of getTopLevelKeys and import it correctly from "ramda"

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

  return (
    <main className='container mx-auto p-4 text-center'>
      <div className='mb-4'>
        <h1>
          <strong>Welcome to Skin Builder</strong>
        </h1>

        <p className='text-sm'>
          This is a tool that allows you to customize the appearance of DeGods.
        </p>
      </div>

      <Tabs
        aria-label='Options'
        selectedKey={selectedTab}
        onSelectionChange={(tab) => {
          handleTab(tab as string)
        }}
      >
        <Tab key='DeGods' title='DeGods'>
          <DegodsBuilder />
        </Tab>

        <Tab key='Y00ts' title='Y00ts'>
          <YootsBuilder />
        </Tab>
      </Tabs>
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
