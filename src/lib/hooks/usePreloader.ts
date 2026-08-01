'use client'

import { useEffect, useState } from 'react'

const SESSION_KEY = 'syph4_preloader_shown'

/**
 * Returns whether the preloader should be shown.
 * On first visit (per session) returns true; subsequent visits return false.
 * Also marks the preloader as shown so it doesn't replay.
 */
export function usePreloader(): {
  shouldShow: boolean
  markDone: () => void
} {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const shown = sessionStorage.getItem(SESSION_KEY)
    if (!shown) {
      setShouldShow(true)
    }
  }, [])

  function markDone() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setShouldShow(false)
  }

  return { shouldShow, markDone }
}
