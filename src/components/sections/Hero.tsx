'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
  icpLine?: string | null
  roles?: Array<{ role: string }> | null
  tagline?: string | null
  portrait?: { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | null
  ctaPrimary?: { label?: string | null; href?: string | null } | null
  ctaSecondary?: { label?: string | null; href?: string | null } | null
  stats?: HeroStat[] | null
  availableForWork?: boolean | null
  reelYoutubeId?: string | null
}

// Split text into word spans for clip-path reveal
function WordReveal({
  text,
  className,
  style,
  baseDelay = 0,
  reducedMotion,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  baseDelay?: number
  reducedMotion: boolean
}) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ ...style, display: 'block' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={reducedMotion ? {} : { y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: baseDelay + i * 0.04,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00a0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Magnetic button wrapper
function MagneticButton({
  children,
  className,
  href,
  reducedMotion,
}: {
  children: React.ReactNode
  className?: string
  href: string
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18 })
  const springY = useSpring(y, { stiffness: 200, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
    const radius = 80
    if (dist < radius) {
      x.set((e.clientX - cx) * 0.35)
      y.set((e.clientY - cy) * 0.35)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  )
}

export function Hero({ data }: { data: HeroData }) {
  const reducedMotion = useReducedMotion()
  const roles = data.roles ?? []
  const [roleIndex, setRoleIndex] = useState(0)
  const [fadeRole, setFadeRole] = useState(true)
  const portraitRef = useRef<HTMLDivElement>(null)

  // Portrait parallax
  const { scrollY } = useScroll()
  const portraitY = useTransform(scrollY, [0, 600], [0, reducedMotion ? 0 : -40])

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

  const portraitUrl = data.portrait?.url ? getMediaUrl(data.portrait.url) : null
  const hasReel = Boolean(data.reelYoutubeId)
  const primaryLabel = data.ctaPrimary?.label ?? 'Watch My Reel'
  const primaryHref  = data.ctaPrimary?.href  ?? '#reel'
  const secondaryLabel = data.ctaSecondary?.label ?? 'Start a Project'
  const secondaryHref  = data.ctaSecondary?.href  ?? '#contact'

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial gradient for depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: portraitUrl ? '1fr auto' : '1fr',
            alignItems: 'center',
            gap: 80,
            paddingTop: 64,
            paddingBottom: 64,
          }}
          className="hero-grid"
        >
          {/* Content */}
          <div style={{ maxWidth: 640 }}>

            {/* Availability dot */}
            {data.availableForWork !== false && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 24,
                  padding: '6px 14px',
                  border: '1px solid #2A2A2A',
                  borderRadius: 100,
                  background: 'rgba(94,234,122,0.06)',
                  borderColor: 'rgba(94,234,122,0.2)',
                }}
              >
                <span className="availability-dot" aria-hidden />
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontStyle: 'italic',
                    fontSize: 11,
                    color: '#5EEA7A',
                    letterSpacing: '0.06em',
                  }}
                >
                  Available for new projects
                </span>
              </motion.div>
            )}

            {/* Name — clip-path word reveal */}
            <h1
              style={{
                fontSize: 'clamp(56px, 10vw, 120px)',
                fontWeight: 700,
                color: '#FAFAFA',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                marginBottom: 20,
              }}
            >
              <WordReveal
                text={data.name ?? 'SYPH4'}
                baseDelay={0.1}
                reducedMotion={reducedMotion}
              />
            </h1>

            {/* ICP line */}
            {(data.icpLine || data.roles) && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 28 }}
              >
                {/* Cycling role */}
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
                {/* ICP line */}
                {data.icpLine && (
                  <p
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontStyle: 'italic',
                      fontSize: 12,
                      color: '#606060',
                      letterSpacing: '0.04em',
                      marginTop: 8,
                    }}
                  >
                    {data.icpLine}
                  </p>
                )}
              </motion.div>
            )}

            {/* Tagline */}
            {data.tagline && (
              <motion.p
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 16,
                  color: '#808080',
                  lineHeight: 1.75,
                  maxWidth: 440,
                  marginBottom: 48,
                }}
              >
                {data.tagline}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 12, marginBottom: 64, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <MagneticButton
                href={primaryHref}
                className="btn btn-primary"
                reducedMotion={reducedMotion}
              >
                {primaryLabel}
                <ArrowRight size={14} aria-hidden />
              </MagneticButton>
              <Link
                href={secondaryHref}
                className="btn btn-secondary"
              >
                {secondaryLabel}
              </Link>
            </motion.div>

            {/* Stats */}
            {data.stats && data.stats.length > 0 && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
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
              ref={portraitRef}
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: 'clamp(180px, 20vw, 300px)',
                aspectRatio: '3/4',
                overflow: 'hidden',
                flexShrink: 0,
                borderRadius: 4,
                y: portraitY,
              }}
            >
              <Image
                src={portraitUrl}
                alt={data.portrait?.alt ?? 'Portrait'}
                fill
                priority
                sizes="(max-width: 768px) 180px, 300px"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
              {/* Film grain overlay */}
              <div className="noise-overlay" aria-hidden />
              {/* Edge vignette */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(11,11,11,0.5) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          )}

          {/* Hero Reel embed (when no portrait, show inline reel) */}
          {!portraitUrl && hasReel && (
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: 'clamp(280px, 35vw, 480px)',
                aspectRatio: '16/9',
                overflow: 'hidden',
                flexShrink: 0,
                borderRadius: 8,
                border: '1px solid #2A2A2A',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${data.reelYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.reelYoutubeId}&modestbranding=1&rel=0`}
                title="Showreel"
                allow="autoplay; encrypted-media"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  pointerEvents: 'none',
                }}
                aria-hidden
              />
              {/* Dark overlay to prevent YouTube UI from showing */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.15)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

