'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { getYoutubeThumbnail, getYoutubeEmbedUrl } from '@/lib/utils'

interface VideoCardProps {
  youtubeId: string
  title?: string
  aspectRatio?: '16/9' | '9/16' | '1/1'
}

export function VideoCard({ youtubeId, title, aspectRatio = '16/9' }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)
  const thumbUrl   = getYoutubeThumbnail(youtubeId, 'hqdefault')
  const embedUrl   = getYoutubeEmbedUrl(youtubeId)

  if (playing) {
    return (
      <div
        className="video-card"
        style={{
          aspectRatio,
          position: 'relative',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        <iframe
          src={embedUrl}
          title={title ?? 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  return (
    <div
      className="video-card"
      style={{ aspectRatio }}
      onClick={() => setPlaying(true)}
      onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${title ?? 'video'}`}
    >
      <Image
        src={thumbUrl}
        alt={title ?? 'Video thumbnail'}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
        style={{ objectFit: 'cover' }}
      />
      <div className="video-card-play">
        <div className="video-card-play-icon">
          <Play
            size={22}
            fill="#FAFAFA"
            color="#FAFAFA"
            style={{ marginLeft: 3 }}
            aria-hidden="true"
          />
        </div>
      </div>
      {title && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '32px 16px 16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          }}
        >
          <span style={{ color: '#FAFAFA', fontSize: 13, fontWeight: 500 }}>{title}</span>
        </div>
      )}
    </div>
  )
}
