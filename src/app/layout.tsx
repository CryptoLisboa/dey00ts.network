import './globals.css'
import "rc-toastr/dist/index.css" 
import 'leaflet/dist/leaflet.css'

import type { Metadata } from 'next'
import { Inter, Luckiest_Guy } from 'next/font/google'
import { Providers } from '../providers/Providers.client'
import { Rowdies } from 'next/font/google'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

const lucky = Luckiest_Guy({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lucky',
})

export const metadata: Metadata = {
  title: 'dey00ts network',
  description: 'FIND YOUR fRIENDS FROM THE DeGods AND y00ts COMMUNITY',
}

const rowdies = Rowdies({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-rowdies',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`dark ${rowdies.variable} ${lucky.variable}`}>
      <body className={inter.className}>
        <Providers>
          <header>
            <Navbar />
          </header>
          <>{children}</>
        </Providers>
      </body>
    </html>
  )
}
