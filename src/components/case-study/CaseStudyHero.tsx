import Image from 'next/image'
import { VideoCard } from '@/components/ui/VideoCard'
import { getMediaUrl } from '@/lib/utils'

interface CaseStudyHeroProps {
  title: string
  category?: string | null
  year?: number | null
  youtubeId?: string | null
  coverImage?: { url?: string | null; alt?: string | null } | null
}

export function CaseStudyHero({ title, category, year, youtubeId, coverImage }: CaseStudyHeroProps) {
  const coverUrl = coverImage?.url ? getMediaUrl(coverImage.url) : null

  return (
    <section aria-label="Project hero" style={{ paddingTop: 80 }}>
      {/* Text header */}
      <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 11,
            color: '#808080',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          {[category, year].filter(Boolean).join(' · ')}
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 700,
            color: '#FAFAFA',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Hero media */}
      <div style={{ position: 'relative' }}>
        {youtubeId ? (
          <div className="container">
            <VideoCard youtubeId={youtubeId} title={title} />
          </div>
        ) : coverUrl ? (
          <div style={{ position: 'relative', aspectRatio: '21/9', overflow: 'hidden' }}>
            <Image
              src={coverUrl}
              alt={coverImage?.alt ?? title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div
            style={{
              background: '#111111',
              aspectRatio: '21/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#2A2A2A', fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 12 }}>
              No media
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
