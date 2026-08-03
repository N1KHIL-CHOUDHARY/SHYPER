'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePreloader } from '@/lib/hooks/usePreloader'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

const SEQUENCE_STEPS = [
  'Loading Assets...',
  'Importing Clips...',
  'Creating Sequence...',
  'Color Grading...',
  'Adding Motion Graphics...',
  'Mixing Audio...',
  'Exporting...',
] as const

const BAR_SEGMENTS = 32

/**
 * CSS-driven ASCII-style bar. Segments are real flex children so the bar
 * always spans the full width of its container regardless of font metrics —
 * previously this was rendered as literal repeated glyphs in a <span>,
 * whose width was fixed by character count × font width. If that fixed
 * width happened to be less than the flex-1 container's width, the bar
 * visually stalled partway across the box even at 100% progress. Segments
 * guarantee 0–100% always maps to the full container width.
 */
function AsciiProgressBar({ progress }: { progress: number }) {
  const exact = (progress / 100) * BAR_SEGMENTS
  const filled = Math.min(BAR_SEGMENTS, Math.floor(exact))
  const partial = Math.min(1, Math.max(0, exact - filled))
  const hasPartial = filled < BAR_SEGMENTS

  return (
    <div className="flex items-center gap-4 font-mono text-xs sm:text-sm select-none">
      <div className="flex flex-1 h-[1.1em] gap-[2px] rounded-[3px] overflow-hidden bg-[#161616]">
        {Array.from({ length: BAR_SEGMENTS }).map((_, i) => {
          const isFilled = i < filled
          const isPartial = hasPartial && i === filled
          return (
            <div key={i} className="flex-1 relative bg-[#232323]">
              {(isFilled || isPartial) && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#FAFAFA]"
                  style={{ width: isFilled ? '100%' : `${partial * 100}%` }}
                />
              )}
            </div>
          )
        })}
      </div>
      <span className="font-semibold tabular-nums text-[#FAFAFA] min-w-[3.5ch] text-right">
        {Math.round(progress)}%
      </span>
    </div>
  )
}

function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block w-[7px] h-[1em] translate-y-[1px] bg-[#FAFAFA] ml-1.5"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
    />
  )
}

export function Preloader() {
  const { shouldShow, markDone } = usePreloader()
  const reducedMotion = useReducedMotion()

  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!shouldShow || reducedMotion) {
      markDone()
      setIsVisible(false)
      return
    }

    setIsVisible(true)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let animationFrameId: number
    let exitTimeoutId: NodeJS.Timeout
    let startTime: number | null = null
    const TOTAL_DURATION = 4500;

    const stepAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const rawProgress = Math.min(100, (elapsed / TOTAL_DURATION) * 100)

      setProgress(rawProgress)

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(stepAnimation)
      } else {
        exitTimeoutId = setTimeout(() => {
          setIsExiting(true)
        }, 300)
      }
    }

    animationFrameId = requestAnimationFrame(stepAnimation)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(exitTimeoutId)
      document.body.style.overflow = originalOverflow
    }
  }, [shouldShow, reducedMotion])

  const handleExitComplete = () => {
    markDone()
    setIsVisible(false)
    document.body.style.overflow = ''
  }

  if (!shouldShow || !isVisible) return null

  const currentStepIndex =
    progress >= 100
      ? SEQUENCE_STEPS.length - 1
      : Math.min(Math.floor((progress / 100) * SEQUENCE_STEPS.length), SEQUENCE_STEPS.length - 1)

  const activeStepMessage = SEQUENCE_STEPS[currentStepIndex]
  const isComplete = progress >= 100

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            filter: 'blur(8px)',
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B] p-4 font-mono select-none"
          aria-live="polite"
          aria-label="Loading workspace sequence"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[640px] border border-[#232323] bg-[#111111] p-8 sm:p-12 shadow-2xl rounded-lg"
          >
            {/* Header */}
            <div className="mb-9 flex items-center justify-between gap-4 border-b border-[#232323] pb-6">
              <div className="flex flex-col gap-2 min-w-0">
                <span className="block text-[12px] tracking-[0.24em] text-[#707070] uppercase">
                  Project Sequence
                </span>
              </div>
              <span className="shrink-0 text-[11px] text-[#707070] tracking-[0.15em] tabular-nums">
                {String(Math.round(progress)).padStart(2, '0')}:
                {String(Math.round((progress / 100) * 22)).padStart(2, '0')}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-9 rounded-md bg-[#0B0B0B] p-6 border border-[#232323]">
              <div className="mb-5 flex items-center justify-between gap-4 text-xs min-h-[1.4em]">
                <span className="flex items-center text-[#808080] min-w-0 truncate">
                  <span className="text-[#585858] shrink-0" style={{ marginRight: 4 }}>status</span>
                  <span className="text-[#FAFAFA] font-medium truncate">{activeStepMessage}</span>
                  {!isComplete && <BlinkingCursor />}
                </span>
                <span
                  className={`shrink-0 tracking-[0.15em] text-[11px] ${
                    isComplete ? 'text-[#FAFAFA] font-semibold' : 'text-[#585858]'
                  }`}
                >
                  {isComplete ? 'COMPLETE' : 'RENDERING'}
                </span>
              </div>
              <AsciiProgressBar progress={progress} />
            </div>

            {/* Steps */}
            <div className="mb-9 flex flex-col gap-1.5 rounded-md border border-[#232323] bg-[#0B0B0B]/40 p-4 text-xs">
              {SEQUENCE_STEPS.map((step, idx) => {
                const isDone = idx < currentStepIndex || isComplete
                const isActive = idx === currentStepIndex && !isComplete

                return (
                  <div
                    key={step}
                    className={`flex items-center justify-between gap-4 rounded-sm px-6 py-2.5 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#FAFAFA] font-medium bg-[#1A1A1A]'
                        : isDone
                        ? 'text-[#7A7A7A]'
                        : 'text-[#3A3A3A]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className={isDone || isActive ? 'text-[#454545]' : 'text-[#2E2E2E]'}>
                        0{idx + 1}
                      </span>
                      <span className="truncate">{step}</span>
                    </div>

                    <div className="font-mono text-[11px] shrink-0">
                      {isDone ? (
                        <span className="text-[#FAFAFA]/80 font-semibold">OK</span>
                      ) : isActive ? (
                        <motion.span
                          className="text-[#FAFAFA] font-semibold"
                          animate={{ opacity: [1, 0.35, 1] }}
                          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          &gt;&gt;
                        </motion.span>
                      ) : (
                        <span className="text-[#2A2A2A]">··</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[#232323] flex items-center justify-between gap-4 text-[11px] text-[#707070]">
              <span className="tracking-[0.15em]">SYPH4 NLE CORE v2.8</span>
              <span className="shrink-0">
                {isComplete ? (
                  <span className="text-[#FAFAFA] font-semibold tracking-[0.1em]">SUCCESS · 100%</span>
                ) : (
                  <span className="tracking-[0.1em]">PROCESSING</span>
                )}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}