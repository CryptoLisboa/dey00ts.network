import { UserCreated } from '@/types/app.types'
import { IAuthUser } from '@/types/auth.types'

const Y00T_COLLECTION_ADDRESSES = [
  '4mKSoDDqApmF1DqXvVTSL6tu2zixrSSNjqMxUnwvVzy2',
  '0x670fd103b1a08628e9557cd66b87ded841115190',
  '0xfd1b0b0dfa524e1fd42e7d51155a663c581bbd50',
]

export function isY00tCollectionAddress(address: string) {
  return Y00T_COLLECTION_ADDRESSES.includes(address)
}

export const hasY00tsNFTs = (profile: any) => {
  return profile.collections.some((collection: { contract: string }) =>
    isY00tCollectionAddress(collection.contract)
  )
}

export const hasDeGodsNFTs = (profile: any) => {
  return profile.collections.some(
    (collection: { contract: string }) => !isY00tCollectionAddress(collection.contract)
  )
}
