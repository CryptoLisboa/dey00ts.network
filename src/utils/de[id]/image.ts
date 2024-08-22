import { Collection, Token, User } from '@prisma/client'
import { isY00tCollectionAddress } from '@/utils/de[id]/collection'

export function generateDeGodsImageUrl(
  tokenId: number,
  width: number,
  quality: number
): string {
  const baseUrl = 'https://image-resizing.degods.workers.dev/'
  const metadataUrl = `https://metadata.degods.com/g/${tokenId}-dead-rm.png`
  return `${baseUrl}?width=${width}&quality=${quality}&image=${encodeURIComponent(
    metadataUrl
  )}`
}

export function generateY00tsImageUrl(
  tokenId: number,
  width: number,
  quality: number
): string {
  const baseUrl = 'https://image-resizing.degods.workers.dev/'
  const metadataUrl = `https://metadata.y00ts.com/y/${tokenId}.png`
  return `${baseUrl}?width=${width}&quality=${quality}&image=${encodeURIComponent(
    metadataUrl
  )}`
}

export function getImageOfFirstToken(
  user: User & { collections: (Collection & { tokens: Token[] })[] }
) {
  const hasCollectionInstance =
    user?.collections?.[0]?.contract && user?.collections?.[0]?.tokens?.[0]
  let imageOfFirstToken
  if (hasCollectionInstance) {
    imageOfFirstToken = isY00tCollectionAddress(
      user?.collections?.[0]?.contract
    )
      ? generateY00tsImageUrl(
          user?.collections?.[0]?.tokens?.[0]?.tokenId,
          64,
          100
        )
      : generateDeGodsImageUrl(
          user?.collections?.[0]?.tokens?.[0]?.tokenId,
          64,
          100
        )
  }
  return imageOfFirstToken
}
