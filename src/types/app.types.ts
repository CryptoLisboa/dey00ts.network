export type SignUpContextType = {
  userDetails: {
    gender?: string
    language?: string
    location?: string
    interests?: string[]
    bio?: string
    experiences?: Experience[]
  }
  updateUserDetails: (details: Partial<UserDetails>) => void
}

export type UserDetails = {
  gender?: string
  language?: string
  location?: string
  interests?: string[]
  bio?: string
  experiences?: Experience[]
}

export type Experience = {
  title: string
  description: string
  year: number
}
export type User = {
  id: string
  phoneNumber: string
}

export type CreateUser = {}

export type SignupData = {
  gender?: string
  language?: string
  location?: string
  interests?: string[]
  bio?: string
  experiences?: Experience[]
}

export type Auth = {
  isAuthenticated: boolean
  loading: boolean
  isSubmitting: boolean
  signup: (user: CreateUser) => Promise<void>
  login: (phone: string, code: string) => Promise<void>
  logOut: (cause?: string) => Promise<void>
  getUserData: (isFirstLoad?: boolean) => Promise<void>
  setSignupData: (data: SignupData) => void
  user?: Partial<User>
  signupData?: Partial<SignupData>
}
