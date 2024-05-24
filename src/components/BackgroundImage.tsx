import Image from 'next/image'

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
      style={{ objectFit: 'cover', zIndex: -1 }}
      className={className}
      // placeholder="blur" // needs blurDataURL
      // blurDataURL=""
    />
  )
}
