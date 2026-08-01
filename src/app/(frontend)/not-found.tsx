import Link from 'next/link'

export default function NotFound() {
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
            color: '#808080',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            color: '#FAFAFA',
            letterSpacing: '-0.04em',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          This page was cut.
        </h1>
        <p style={{ color: '#808080', fontSize: 15, maxWidth: 400 }}>
          Like a clip that didn't make the final edit — this page doesn't exist.
        </p>
      </div>
      <Link href="/" className="btn btn-secondary">
        ← Back to Home
      </Link>
    </div>
  )
}
