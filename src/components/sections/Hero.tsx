'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Counter } from '@/components/ui/Counter'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export interface HeroStat {
  value: string
  label: string
}

export interface HeroRole {
  role: string
}

export interface HeroCTA {
  label?: string | null
  href?: string | null
}

export interface HeroPortrait {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export interface HeroData {
  greeting?: string | null
  name?: string | null
  icpLine?: string | null
  roles?: HeroRole[] | null
  tagline?: string | null
  portrait?: HeroPortrait | null
  ctaPrimary?: HeroCTA | null
  ctaSecondary?: HeroCTA | null
  stats?: HeroStat[] | null
  availableForWork?: boolean | null
  reelYoutubeId?: string | null
  videoUrl?: string | null
}

export interface HeroProps {
  data?: HeroData | null
}

interface WordRevealProps {
  text: string
  className?: string
  style?: React.CSSProperties
  baseDelay?: number
  reducedMotion: boolean
}

function WordReveal({
  text,
  className,
  style,
  baseDelay = 0,
  reducedMotion,
}: WordRevealProps) {
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

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href: string
  reducedMotion: boolean
}

function MagneticButton({
  children,
  className,
  href,
  reducedMotion,
}: MagneticButtonProps) {
  const [btnNode, setBtnNode] = useState<HTMLAnchorElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18 })
  const springY = useSpring(y, { stiffness: 200, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !btnNode) return
    const rect = btnNode.getBoundingClientRect()
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
      ref={(node) => setBtnNode(node)}
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

export function Hero({ data }: HeroProps) {
  const reducedMotion = useReducedMotion()
  const safeData = data ?? {}

  const roles =
    safeData.roles && safeData.roles.length > 0
      ? safeData.roles
      : [{ role: 'Senior Video Editor' }, { role: 'Motion Designer' }, { role: 'Colorist' }]

  const stats =
    safeData.stats && safeData.stats.length > 0
      ? safeData.stats
      : [
          { value: '50M+', label: 'Total Views' },
          { value: '120+', label: 'Projects Delivered' },
          { value: '99%', label: 'Client Satisfaction' },
        ]

  const [roleIndex, setRoleIndex] = useState(0)
  const [fadeRole, setFadeRole] = useState(true)
  const [heroNode, setHeroNode] = useState<HTMLDivElement | null>(null)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, reducedMotion ? 0 : -40])

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

  const primaryLabel = safeData.ctaPrimary?.label || 'Book 15-Min Call'
  const primaryHref = safeData.ctaPrimary?.href || '#contact'
  const secondaryLabel = safeData.ctaSecondary?.label || 'Watch Selected Work ↓'
  const secondaryHref = safeData.ctaSecondary?.href || '#work'
  const headline = 'Edits That Make People Watch Twice.'
  const subheadline =
    safeData.tagline ||
    'High-retention video editing, cinematic color grading, and motion design for tech brands and top creators.'

  const fallbackVideoSrc =
    'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4'

  const videoSource = safeData.videoUrl || safeData.portrait?.url || fallbackVideoSrc

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
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 64,
            paddingTop: 64,
            paddingBottom: 64,
          }}
          className="hero-grid"
        >
          <div style={{ maxWidth: 640 }}>
            {safeData.availableForWork !== false && (
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
                  border: '1px solid rgba(94,234,122,0.2)',
                  borderRadius: 100,
                  background: 'rgba(94,234,122,0.06)',
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
                  Available for Q3/Q4 Projects
                </span>
              </motion.div>
            )}

            <h1
              style={{
                fontSize: 'clamp(44px, 7vw, 84px)',
                fontWeight: 700,
                color: '#FAFAFA',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                marginBottom: 20,
              }}
            >
              <WordReveal text={headline} baseDelay={0.1} reducedMotion={reducedMotion} />
            </h1>

            {roles.length > 0 && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 20 }}
              >
                <p
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    color: '#808080',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    transition: reducedMotion ? 'none' : 'opacity 200ms ease',
                    opacity: fadeRole ? 1 : 0,
                    minHeight: '1.4em',
                  }}
                >
                  {roles[roleIndex]?.role ?? 'Senior Video Editor'}
                </p>
              </motion.div>
            )}

            <motion.p
              initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 16,
                color: '#A0A0A0',
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 44,
              }}
            >
              {subheadline}
            </motion.p>

            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 12, marginBottom: 56, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <MagneticButton href={primaryHref} className="btn btn-primary" reducedMotion={reducedMotion}>
                {primaryLabel}
                <ArrowRight size={14} aria-hidden />
              </MagneticButton>
              <Link href={secondaryHref} className="btn btn-secondary">
                {secondaryLabel}
              </Link>
            </motion.div>

            {stats.length > 0 && (
              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}
              >
                {stats.map((stat, i) => (
                  <Counter key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
                ))}
              </motion.div>
            )}
          </div>

          <motion.div
            ref={(node) => setHeroNode(node)}
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: 'clamp(280px, 32vw, 440px)',
              aspectRatio: '16/9',
              overflow: 'hidden',
              flexShrink: 0,
              borderRadius: 12,
              border: '1px solid #2A2A2A',
              y: heroY,
              background: '#000',
            }}
          >
            <video
              src={videoSource}
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
              aria-hidden
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 70%, rgba(11,11,11,0.6) 100%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
