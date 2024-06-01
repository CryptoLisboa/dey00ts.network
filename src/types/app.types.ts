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
  current: boolean
  company: string
  skill: string
  role: string
  description: string
  startDate: Date
  endDate: Date
  index: number
}
export type User = {
  id: string
  phoneNumber: string
}

export type CreateUser = {}

export type SignupData = {
  gender?: string
  languages?: string
  location?: string
  interests?: string[]
  bio?: string
  experiences?: Experience[]
  skills?: string[]
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

export type UserCreated = {
  id: string
  email?: string
  name?: string
  bio?: string | null
  createdAt: Date
  emailVerified?: Date | null
  updatedAt: Date
  externalId?: string
  website?: string | null
  image?: string
  active?: boolean
  genderId?: number
  locationId?: number
  profile?: {
    id: number
    userId: string
    bio?: string | null
    avatarUrl?: string | null
  }
  location?: {
    id: number
    name: string
    description?: string | null
    latitude?: number | null
    longitude?: number | null
    value: string
  }
  languages?: {
    id: number
    name: string
  }[]
  contents: any[] // Specify more detailed type if available
  userExperiences: {
    userId: string
    experienceId: number
    experience: {
      id: number
      description?: string
      role?: string
      company?: string
      current?: boolean
      startDate: Date
      endDate?: Date
      skill: {
        id: number
        name: string
      }
    }
  }[]
  dust?: {
    id: number
    userId: string
    amount: number
    preciseAmount: string
    decimals: number
  }
  socials?: {
    id: number
    userId: string
    telegramId?: string | null
    telegramUsername?: string | null
    discordId?: string
    discordUsername?: string
    twitterId?: string
    twitterHandle?: string
    twitterUsername?: string | null
  }
  wallets: {
    id: number
    userId: string
    address: string
    network: string
  }[]
  followers: any[] // Specify more detailed type if available
  followings: any[] // Specify more detailed type if available
  collections: {
    id: number
    network: string
    contract: string
    userId: string
    tokens: {
      id: number
      wallet: string
      tokenId: number
      staked: boolean
      collectionId: number
    }[]
  }[]
}
