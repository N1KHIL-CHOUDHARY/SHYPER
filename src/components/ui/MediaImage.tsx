import Image from 'next/image'
import { getMediaUrl } from '@/lib/utils'

interface PayloadMediaImage {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  filename?: string | null
  sizes?: {
    thumbnail?: { url?: string | null; width?: number | null; height?: number | null }
    card?:      { url?: string | null; width?: number | null; height?: number | null }
    hero?:      { url?: string | null; width?: number | null; height?: number | null }
  } | null
}

interface MediaImageProps {
  media: PayloadMediaImage | null | undefined
  alt?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  quality?: number
  className?: string
  style?: React.CSSProperties
  sizeName?: 'thumbnail' | 'card' | 'hero'
}

/**
 * Wrapper around next/image that handles Payload CMS media objects.
 * Automatically picks the right image size if available.
 */
export function MediaImage({
  media,
  alt,
  fill,
  width,
  height,
  sizes,
  priority = false,
  quality = 85,
  className,
  style,
  sizeName,
}: MediaImageProps) {
  if (!media?.url) {
    // Placeholder for missing images
    return (
      <div
        className={className}
        style={{
          background: '#171717',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
          ...(fill ? { position: 'absolute', inset: 0 } : { width, height }),
        }}
        aria-label={alt ?? 'No image available'}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 10,
            color: '#2A2A2A',
            letterSpacing: '0.1em',
          }}
        >
          NO IMAGE
        </span>
      </div>
    )
  }

  // Pick sized variant if requested and available
  const sizedUrl = sizeName && media.sizes?.[sizeName]?.url
  const src = getMediaUrl(sizedUrl ?? media.url)
  const altText = alt ?? media.alt ?? 'Image'

  if (fill) {
    return (
      <Image
        src={src}
        alt={altText}
        fill
        sizes={sizes ?? '100vw'}
        priority={priority}
        quality={quality}
        className={className}
        style={{ objectFit: 'cover', ...style }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={width ?? media.width ?? 800}
      height={height ?? media.height ?? 600}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      style={style}
    />
  )
}
