'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { AuthProvider } from './AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from 'rc-toastr'
import { SWRConfig } from 'swr'
import { fetcher } from '@/utils/services'

export const Providers = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element | string
}) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{ fetcher, dedupingInterval: 20000, refreshInterval: 20000 }}
      >
        <AuthProvider>
          <ToastProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </ToastProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
