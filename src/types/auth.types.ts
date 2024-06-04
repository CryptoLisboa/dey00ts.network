export type Socials = {
  telegramId: string
  telegramUsername: string
  discordId: string
  discordUsername: string
  twitterId: string
  twitterHandle: string
  twitterUsername: string
}

export type Token = {
  id: number
  wallet: string
  tokenId: number
  staked: boolean
}

export type Collection = {
  id: number
  network: string
  contract: string
  tokens: Token[]
}

export type Wallet = {
  network: string
  address: string
}

export type Dust = {
  amount: number
  preciseAmount: string
  decimals: number
}

export type IAuthUser = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  imageUrl: string
  image: string
  description: string
  website: string
  socials: Socials
  collections: Collection[]
  wallets: Wallet[]
  dust: Dust
  genderId: number
}
