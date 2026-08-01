import React from 'react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(className)}
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        fontSize: 11,
        fontFamily: 'var(--font-geist-mono)',
        fontStyle: 'italic',
        letterSpacing: '0.06em',
        color: '#808080',
        border: '1px solid #2A2A2A',
        borderRadius: 2,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
