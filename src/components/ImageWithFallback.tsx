'use client'

import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps['src']
}

const ImageWithFallback = ({
  fallback = 'temp/avatar.png',
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null)

  useEffect(() => {
    setError(null)
  }, [src])

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      unoptimized
      {...props}
    />
  )
}

export default ImageWithFallback
