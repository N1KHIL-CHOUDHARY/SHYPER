'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    const timer = setTimeout(() => {
      window.addEventListener('scroll', check, { passive: true })
      check()
    }, 3000)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', check)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="mobile-sticky-cta"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Book a call - sticky mobile CTA"
        >
          <Link href="#contact" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
            Book a Free Call
          </Link>
          <Link href="#work" className="btn btn-secondary" style={{ flexShrink: 0, fontSize: 13 }}>
            Work
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}