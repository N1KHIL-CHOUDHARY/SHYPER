'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface ReelData {
  reelYoutubeId?: string | null
  heading?: string | null
  subtext?: string | null
}

export function Reel({ data }: { data: ReelData }) {
  if (!data || !data.reelYoutubeId) return null
  return <ReelInner data={data} />
}

function ReelInner({ data }: { data: ReelData }) {
  const reducedMotion = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerNode ? { current: containerNode } : undefined,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : 40, reducedMotion ? 0 : -40])

  const thumbUrl = 'https://i.ytimg.com/vi/' + data.reelYoutubeId + '/maxresdefault.jpg'
  const embedUrl = 'https://www.youtube.com/embed/' + data.reelYoutubeId + '?autoplay=1&rel=0&modestbranding=1'

  return (
    <section id="reel" className="section" aria-label="Showreel">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <SectionLabel>Showreel</SectionLabel>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 8 }}>
              {data.heading ?? 'The Work Speaks.'}
            </h2>
          </div>
          {data.subtext && (
            <p style={{ fontSize: 14, color: '#606060', maxWidth: 280, textAlign: 'right', lineHeight: 1.6 }}>
              {data.subtext}
            </p>
          )}
        </div>

        <motion.div ref={(node) => setContainerNode(node)} style={{ y }} aria-label="Showreel video player">
          <div className="reel-container">
            <div className={'reel-overlay' + (playing ? ' hidden' : '')}>
              <button
                className="reel-play-btn"
                onClick={() => setPlaying(true)}
                aria-label="Play showreel"
              >
                <span className="reel-play-circle">
                  <Play size={28} fill="currentColor" aria-hidden />
                </span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 12, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>
                  PLAY SHOWREEL
                </span>
              </button>
            </div>

            {!playing && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(' + thumbUrl + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1,
                }}
                aria-hidden
              />
            )}

            {playing && (
              <motion.iframe
                key="reel-iframe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={embedUrl}
                title={data.heading ?? 'Showreel'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', zIndex: 2 }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}