'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { VideoCard } from '@/components/ui/VideoCard'
import { Tag } from '@/components/ui/Tag'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface ProjectResult {
  metric: string
  value: string
}

interface ProjectRowProps {
  index: string
  title: string
  category?: string | null
  year?: number | null
  slug: string
  description?: string | null
  youtubeId?: string | null
  software?: Array<{ name: string }>
  results?: ProjectResult[]
}

export function ProjectRow({
  index,
  title,
  category,
  year,
  slug,
  description,
  youtubeId,
  software = [],
  results = [],
}: ProjectRowProps) {
  const [expanded, setExpanded] = useState(false)
  const reducedMotion = useReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <div className="project-row">
      {/* Header row — clickable */}
      <button
        ref={btnRef}
        className="project-row-header"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`project-${slug}-content`}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          padding: '24px 0',
        }}
      >
        {/* Index */}
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 12,
            color: '#808080',
            letterSpacing: '0.06em',
            minWidth: 40,
          }}
        >
          {index}
        </span>

        {/* Title */}
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: expanded ? '#FAFAFA' : '#C2C2C2',
            transition: 'color 200ms ease',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </span>

        {/* Category — hidden on mobile */}
        {category && (
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 11,
              color: '#808080',
              letterSpacing: '0.08em',
              display: 'var(--show-cat, block)',
            }}
            className="hidden sm:block"
          >
            {category}
          </span>
        )}

        {/* Year */}
        {year && (
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 11,
              color: '#808080',
              letterSpacing: '0.08em',
            }}
          >
            {year}
          </span>
        )}

        {/* Expand indicator */}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={transition as any}
          style={{ display: 'flex', alignItems: 'center', color: '#808080' }}
        >
          <ChevronDown size={16} aria-hidden="true" />
        </motion.span>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`project-${slug}-content`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: youtubeId ? '1fr 1fr' : '1fr',
                gap: 48,
                paddingBottom: 40,
                paddingTop: 8,
              }}
              className="project-expanded-grid"
            >
              {/* Video / Thumbnail */}
              {youtubeId && (
                <div>
                  <VideoCard youtubeId={youtubeId} title={title} />
                </div>
              )}

              {/* Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {description && (
                  <p style={{ color: '#C2C2C2', lineHeight: 1.7, fontSize: 15 }}>
                    {description}
                  </p>
                )}

                {/* Software tags */}
                {software.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {software.map((s) => (
                      <Tag key={s.name}>{s.name}</Tag>
                    ))}
                  </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                    {results.map((r) => (
                      <div key={r.metric}>
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 600,
                            color: '#FAFAFA',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                          }}
                        >
                          {r.value}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-geist-mono)',
                            fontStyle: 'italic',
                            fontSize: 10,
                            color: '#808080',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            marginTop: 4,
                          }}
                        >
                          {r.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div>
                  <Link
                    href={`/projects/${slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#FAFAFA',
                      borderBottom: '1px solid #2A2A2A',
                      paddingBottom: 2,
                      transition: 'border-color 200ms ease',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget.style.borderColor = '#FAFAFA'))
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget.style.borderColor = '#2A2A2A'))
                    }
                    aria-label={`View case study for ${title}`}
                  >
                    View Case Study
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .project-expanded-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
