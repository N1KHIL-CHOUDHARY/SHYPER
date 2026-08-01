'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Counter } from '@/components/ui/Counter'
import { getMediaUrl } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface HeroStat {
  value: string
  label: string
}

interface HeroData {
  greeting?: string | null
  name?: string | null
  roles?: Array<{ role: string }> | null
  tagline?: string | null
  portrait?: { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | null
  ctaPrimary?: { label?: string | null; href?: string | null } | null
  ctaSecondary?: { label?: string | null; href?: string | null } | null
  stats?: HeroStat[] | null
}

export function Hero({ data }: { data: HeroData }) {
  const reducedMotion = useReducedMotion()
  const roles = data.roles ?? []
  const [roleIndex, setRoleIndex] = useState(0)
  const [fadeRole, setFadeRole] = useState(true)

  useEffect(() => {
    if (roles.length < 2 || reducedMotion) return
    const interval = setInterval(() => {
      setFadeRole(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setFadeRole(true)
      }, 200)
    }, 2800)
    return () => clearInterval(interval)
  }, [roles.length, reducedMotion])

  const fadeUp = {
    initial: reducedMotion ? {} : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  const portraitUrl = data.portrait?.url ? getMediaUrl(data.portrait.url) : null

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        background: '#0B0B0B',
        paddingTop: 64,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 80,
            paddingTop: 64,
            paddingBottom: 64,
          }}
          className="hero-grid"
        >
          {/* Content */}
          <div style={{ maxWidth: 600 }}>
            {/* Greeting */}
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontStyle: 'italic',
                fontSize: 13,
                color: '#808080',
                letterSpacing: '0.06em',
                marginBottom: 16,
              }}
            >
              {data.greeting ?? "Hi, I'm"}
            </motion.p>

            {/* Name */}
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(56px, 10vw, 120px)',
                fontWeight: 700,
                color: '#FAFAFA',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                marginBottom: 24,
              }}
            >
              {data.name ?? 'SYPH4'}
            </motion.h1>

            {/* Role */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 32 }}
            >
              <p
                style={{
                  fontSize: 'clamp(18px, 3vw, 28px)',
                  color: '#808080',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  transition: reducedMotion ? 'none' : 'opacity 200ms ease',
                  opacity: fadeRole ? 1 : 0,
                  minHeight: '1.4em',
                }}
              >
                {roles[roleIndex]?.role ?? 'Video Editor'}
              </p>
            </motion.div>

            {/* Tagline */}
            {data.tagline && (
              <motion.p
                {...fadeUp}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 16,
                  color: '#808080',
                  lineHeight: 1.7,
                  maxWidth: 440,
                  marginBottom: 48,
                }}
              >
                {data.tagline}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 16, marginBottom: 64, flexWrap: 'wrap' }}
            >
              <Link
                href={data.ctaPrimary?.href ?? '#work'}
                className="btn btn-primary"
              >
                {data.ctaPrimary?.label ?? 'View Work'}
              </Link>
              <Link
                href={data.ctaSecondary?.href ?? '#contact'}
                className="btn btn-secondary"
              >
                {data.ctaSecondary?.label ?? 'Book a Call'}
              </Link>
            </motion.div>

            {/* Stats */}
            {data.stats && data.stats.length > 0 && (
              <motion.div
                {...fadeUp}
                transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}
              >
                {data.stats.map((stat, i) => (
                  <Counter key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Portrait */}
          {portraitUrl && (
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: 'clamp(180px, 20vw, 320px)',
                aspectRatio: '3/4',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Image
                src={portraitUrl}
                alt={data.portrait?.alt ?? 'Portrait'}
                fill
                priority
                sizes="(max-width: 768px) 180px, 320px"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
