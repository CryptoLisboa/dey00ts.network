'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/system'
// import { SignUpProvider } from './SignUpProvider'
import { AuthProvider } from './AuthContext'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element | string
}) => {
  return (
    <SessionProvider>
      <AuthProvider>
        {/* <SignUpProvider> */}
        <NextUIProvider>{children}</NextUIProvider>
        {/* </SignUpProvider> */}
      </AuthProvider>
    </SessionProvider>
  )
}
