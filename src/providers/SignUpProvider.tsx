'use client'
import { SignUpContextType, UserDetails } from '@/types/app.types'
import { createContext, useState } from 'react'

export const SignUpContext = createContext<SignUpContextType | undefined>(
  undefined
)

// export const useSignUp = () => {
//   const context = useContext(SignUpContext)
//   if (!context) {
//     throw new Error('useSignUp must be used within a SignUpProvider')
//   }
//   return context
// }

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({})

  const updateUserDetails = (details: Partial<UserDetails>) => {
    setUserDetails((prev) => ({ ...prev, ...details }))
  }

  console.log({ userDetails })

  return (
    <SignUpContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </SignUpContext.Provider>
  )
}
