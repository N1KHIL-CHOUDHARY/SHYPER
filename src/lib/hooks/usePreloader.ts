'use client'

import { useState } from 'react'

const SESSION_KEY = 'syph4_preloader_shown'

/**
 * Hook for managing preloader visibility across session visits & cold refreshes.
 */
export function usePreloader(): {
  shouldShow: boolean
  markDone: () => void
} {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      // Check if current session is a page reload / cold refresh
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      const isReload = navEntries.length > 0 && navEntries[0].type === 'reload'

      if (isReload) {
        return true
      }

      return !sessionStorage.getItem(SESSION_KEY)
    } catch {
      return true
    }
  })

  function markDone() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Ignore storage errors (e.g. incognito restrictions)
    }
    setShouldShow(false)
  }

  return { shouldShow, markDone }
}
