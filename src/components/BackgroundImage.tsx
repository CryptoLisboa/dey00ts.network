import Image from 'next/image'
import styles from './Background.module.css'

export default function BgImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={100}
      priority
      style={{ objectFit: 'cover', zIndex: -1 }}
      className={className}
      unoptimized
      // placeholder="blur" // needs blurDataURL
      // blurDataURL=""
    />
  )
}

export function BackgroundImageDefault() {
  return <div role='img' aria-label='bg' className={`${styles.background}`} />
}
