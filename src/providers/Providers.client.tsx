'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { SignUpProvider } from './SignUpProvider'
import { AuthProvider } from './AuthContext'

export const Providers = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element | string
}) => {
  return (
    <AuthProvider>
      {/* <SignUpProvider> */}
      <NextUIProvider>{children}</NextUIProvider>
      {/* </SignUpProvider> */}
    </AuthProvider>
  )
}
