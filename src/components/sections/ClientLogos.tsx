import Image from 'next/image'
import { getMediaUrl } from '@/lib/utils'

interface ClientLogo {
  id: string
  name: string
  logo?: { url?: string | null; alt?: string | null } | null
}

interface ClientLogosProps {
  logos: ClientLogo[]
}

export function ClientLogos({ logos }: ClientLogosProps) {
  if (!logos || logos.length === 0) return null

  const items = [...logos, ...logos]

  return (
    <section aria-label="Clients" style={{ paddingTop: 32, paddingBottom: 64, overflow: 'hidden', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingLeft: 80 }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 10, color: '#404040', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Trusted by
        </span>
        <div style={{ flex: 1, height: 1, background: '#1A1A1A' }} />
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track" style={{ alignItems: 'center', gap: 64, paddingLeft: 32 }}>
          {items.map((logo, i) => {
            const src = logo.logo?.url ? getMediaUrl(logo.logo.url) : null
            return (
              <div
                key={logo.id + '-' + i}
                style={{ flexShrink: 0, opacity: 0.4, transition: 'opacity 250ms ease', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = '0.9')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = '0.4')}
                title={logo.name}
              >
                {src ? (
                  <div style={{ position: 'relative', height: 28, width: 120, minWidth: 80 }}>
                    <Image
                      src={src}
                      alt={logo.logo?.alt ?? logo.name}
                      fill
                      sizes="140px"
                      style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ) : (
                  <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: 14, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                    {logo.name}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}