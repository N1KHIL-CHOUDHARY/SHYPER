'use client'

import dynamic from 'next/dynamic'

// Dynamic import with ssr:false must live inside a Client Component
const PreloaderLazy = dynamic(
  () => import('@/components/sections/Preloader').then((m) => m.Preloader),
  { ssr: false },
)

export function PreloaderClient() {
  return <PreloaderLazy />
}
