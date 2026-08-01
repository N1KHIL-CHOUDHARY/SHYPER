'use client'

import dynamic from 'next/dynamic'

const PreloaderLazy = dynamic(
  () => import('@/components/sections/Preloader').then((m) => m.Preloader),
  { ssr: false },
)

export function PreloaderClient() {
  return <PreloaderLazy />
}
