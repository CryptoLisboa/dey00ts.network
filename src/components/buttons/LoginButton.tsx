'use client'
import { handleLogin } from '@/services/deid'
import { Button } from '@nextui-org/react'

export default function LoginButton() {
  return (
    <Button onClick={handleLogin} color='secondary' className='font-lucky'>
      Login
    </Button>
  )
}
