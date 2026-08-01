'use client'

import { useEffect, useRef, useState } from 'react'

type ObserverOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * IntersectionObserver hook.
 * Returns a ref to attach to any element and a boolean indicating visibility.
 */
export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: ObserverOptions = {},
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options
  const ref     = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) {
            hasTriggered.current = true
            observer.disconnect()
          }
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, visible]
}
