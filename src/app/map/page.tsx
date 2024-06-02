'use client'

import dynamic from 'next/dynamic'

const DynamicMapView = dynamic(
  () => import('./MapView').then((mod) => mod.MapView),
  { ssr: false }
)

export default function Page() {
  return (
    <main className='dark flex w-full h-[85vh]' id='map'>
      <DynamicMapView />
    </main>
  )
}
