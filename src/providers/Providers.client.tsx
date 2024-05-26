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
    <NextUIProvider>
      <AuthProvider>
        <SignUpProvider>{children}</SignUpProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}
