'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 32,
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 11,
            color: '#EAB308',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Error
        </div>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#FAFAFA',
            letterSpacing: '-0.03em',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Something went wrong.
        </h1>
        <p style={{ color: '#808080', fontSize: 15, maxWidth: 400 }}>
          An unexpected error occurred. This has been noted.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <button onClick={reset} className="btn btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go Home
        </Link>
      </div>
    </div>
  )
}
