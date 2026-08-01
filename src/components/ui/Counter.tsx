'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface CounterProps {
  value: string // e.g. "50M+", "2.5", "250+"
  label: string
  delay?: number
}

function parseValue(raw: string): { number: number; suffix: string } {
  const match = raw.match(/^([\d.]+)(.*)$/)
  if (!match) return { number: 0, suffix: raw }
  return { number: parseFloat(match[1]), suffix: match[2] }
}

export function Counter({ value, label, delay = 0 }: CounterProps) {
  const reducedMotion = useReducedMotion()
  const { number, suffix } = parseValue(value)
  const [displayed, setDisplayed] = useState(reducedMotion ? number : 0)
  const ref = useRef<HTMLDivElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(number)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const duration = 1500

          const tick = (now: number) => {
            const elapsed = now - start - delay * 1000
            if (elapsed < 0) {
              requestAnimationFrame(tick)
              return
            }
            const progress = Math.min(elapsed / duration, 1)
            // Ease out quad
            const eased = 1 - (1 - progress) ** 3
            setDisplayed(parseFloat((eased * number).toFixed(1)))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [number, delay, reducedMotion])

  const display = Number.isInteger(number) ? Math.round(displayed) : displayed.toFixed(1)

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#FAFAFA',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}{suffix}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontStyle: 'italic',
          fontSize: 11,
          letterSpacing: '0.08em',
          color: '#808080',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}
