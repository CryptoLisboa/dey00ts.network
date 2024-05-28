'use client'
import { useState } from 'react'
import * as React from 'react'
import { Auth, CreateUser, SignupData, User } from '@/types/app.types'
import { useRouter } from 'next/navigation'

/**
 * Create context
 */

const AuthContext = React.createContext<Auth>({
  login: async () => undefined,
  logOut: async () => undefined,
  isAuthenticated: false,
  user: {},
  signup: async () => undefined,
  getUserData: async () => undefined,
  setSignupData: () => undefined,
  loading: false,
  isSubmitting: false,
})

/**
 * Provider
 */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()

  const [user, setUserData] = useState({} as Partial<User>)
  const [signupData, setSignupData] = useState({} as Partial<SignupData>)
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getUserData = async (isFirstLoad?: boolean) => {}

  /**
   * Login flow
   */

  const requestLogin = async (phone: string) => {}

  const login = async (phone: string, code: string) => {}

  const loginWithEmail = async (email: string, password: string) => {}

  const logOut = async (cause?: string) => {}

  const signup = async (user: CreateUser) => {}
  /**
   * Return
   */

  console.log({ user, signupData })

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logOut,
        getUserData,
        signup,
        setSignupData,
        loading,
        isSubmitting,
        isAuthenticated,
        signupData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext