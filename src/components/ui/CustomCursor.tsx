'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const ringScale = useMotionValue(1)

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28 })
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28 })
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const ringScaleSpring = useSpring(ringScale, { stiffness: 200, damping: 20 })

  useEffect(() => {
    if (reducedMotion) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onEnter = () => ringScale.set(1.6)
    const onLeave = () => ringScale.set(1)

    window.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        aria-hidden
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, scale: ringScaleSpring }}
        aria-hidden
      />
    </>
  )
}