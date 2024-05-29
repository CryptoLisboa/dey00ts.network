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
