import React from 'react'

interface SkeletonProps {
  height?: number | string
  width?: number | string
  borderRadius?: number | string
  className?: string
}

function SkeletonBlock({ height = 20, width = '100%', borderRadius = 2 }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius }}
      aria-hidden="true"
    />
  )
}

export function SkeletonProjectRow() {
  return (
    <div
      style={{
        borderTop: '1px solid #2A2A2A',
        padding: '24px 0',
        display: 'grid',
        gridTemplateColumns: '56px 1fr 120px 60px 40px',
        alignItems: 'center',
        gap: 16,
      }}
      aria-hidden="true"
    >
      <SkeletonBlock width={32} height={12} />
      <SkeletonBlock width="60%" height={16} />
      <SkeletonBlock width={80} height={12} />
      <SkeletonBlock width={40} height={12} />
      <SkeletonBlock width={16} height={16} borderRadius="50%" />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div
      style={{
        background: '#111111',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
      aria-hidden="true"
    >
      <SkeletonBlock width="40%" height={12} />
      <SkeletonBlock width="80%" height={20} />
      <SkeletonBlock width="90%" height={14} />
      <SkeletonBlock width="70%" height={14} />
    </div>
  )
}
