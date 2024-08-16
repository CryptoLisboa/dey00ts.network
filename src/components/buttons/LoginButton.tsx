'use client'
import { handleLogin } from '@/services/deid'
import { Button } from '@nextui-org/react'

export default function LoginButton() {
  return (
    <Button
      onClick={handleLogin}
      color='secondary'
      className='font-lucky px-3 py-2 lg:px-5 lg:py-4 min-w-fit'
    >
      Login
    </Button>
  )
}
