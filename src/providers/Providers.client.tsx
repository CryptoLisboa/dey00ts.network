'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { AuthProvider } from './AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from 'rc-toastr'

export const Providers = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element | string
}) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <ToastProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </ToastProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
