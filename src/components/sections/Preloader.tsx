'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from '@/lib/hooks/usePreloader'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const STEPS = [
  'Importing Assets',
  'Timeline',
  'Audio',
  'Effects',
  'Color Grade',
  'Motion Graphics',
  'Export',
] as const

const STEP_DURATION = 300 // ms per step
const TOTAL_DURATION = STEPS.length * STEP_DURATION + 800

function ProgressBar({ progress }: { progress: number }) {
  const filled = Math.round(progress * 14)
  const empty  = 14 - filled
  return (
    <span style={{ fontFamily: 'inherit', color: '#5EEA7A' }}>
      {'█'.repeat(filled)}
      {'░'.repeat(empty)}
    </span>
  )
}

export function Preloader() {
  const { shouldShow, markDone } = usePreloader()
  const reducedMotion = useReducedMotion()
  const [currentStep, setCurrentStep] = useState(-1)
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!shouldShow || reducedMotion) {
      markDone()
      setVisible(false)
      return
    }

    setVisible(true)

    // Advance through each step
    let step = 0
    const interval = setInterval(() => {
      setCurrentStep(step)
      step++
      if (step >= STEPS.length) {
        clearInterval(interval)
        setTimeout(() => setDone(true), 400)
        setTimeout(() => {
          markDone()
          setVisible(false)
        }, TOTAL_DURATION)
      }
    }, STEP_DURATION)

    // Hard cut safety after 3.2s
    const safety = setTimeout(() => {
      clearInterval(interval)
      markDone()
      setVisible(false)
    }, 3200)

    return () => {
      clearInterval(interval)
      clearTimeout(safety)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow, reducedMotion])

  if (!visible) return null

  const progress = currentStep >= 0 ? (currentStep + 1) / STEPS.length : 0

  return (
    <div className="preloader-overlay" aria-live="polite" aria-label="Loading portfolio">
      <div className="preloader-panel">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#808080', marginBottom: 4 }}>
            PROJECT
          </div>
          <div style={{ color: '#FAFAFA', fontSize: 14, letterSpacing: '0.02em' }}>
            syph4_showreel_v28.prproj
          </div>
        </div>

        {/* Progress bar */}
        {currentStep >= 0 && (
          <div style={{ marginBottom: 24 }}>
            <ProgressBar progress={progress} />
            <span style={{ color: '#808080', marginLeft: 8, fontSize: 12 }}>
              {Math.round(progress * 100)}%
            </span>
          </div>
        )}

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {STEPS.map((step, i) => {
            const isReady = i <= currentStep
            return (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ minWidth: 140, color: '#808080' }}>{step}</span>
                <span style={{ color: '#2A2A2A' }}>{'.'}</span>
                <span style={{ color: '#2A2A2A' }}>{'........'}</span>
                <span style={{ color: '#2A2A2A' }}>{'.'}</span>
                {isReady ? (
                  <span style={{ color: '#5EEA7A', fontWeight: 600 }}>Ready</span>
                ) : (
                  <span style={{ color: '#2A2A2A' }}>—</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #2A2A2A', margin: '28px 0' }} />

        {/* Ready state */}
        {done ? (
          <div>
            <div className="preloader-ready" style={{ marginBottom: 16 }}>
              READY
            </div>
            <button
              className="preloader-play"
              onClick={() => {
                markDone()
                setVisible(false)
              }}
              aria-label="Enter portfolio"
            >
              [ PLAY ]
            </button>
          </div>
        ) : (
          <div style={{ color: '#2A2A2A', fontSize: 12 }}>
            {currentStep < 0 ? 'Initializing...' : 'Processing...'}
          </div>
        )}
      </div>
    </div>
  )
}
