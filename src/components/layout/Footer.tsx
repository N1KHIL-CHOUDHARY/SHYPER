'use client'

import Link from 'next/link'

interface FooterProps {
  siteName: string
  navItems: Array<{ label: string; href: string }>
  footerLinks: Array<{ label: string; href: string }>
  footerNote: string
  socials: Array<{ platform: string; url: string; label?: string | null }>
}

export function Footer({ siteName, navItems, footerLinks, footerNote, socials }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{ borderTop: '1px solid #2A2A2A', background: '#0B0B0B' }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'start',
            gap: 64,
            paddingTop: 64,
            paddingBottom: 64,
          }}
        >
          {/* Left — brand */}
          <div>
            <Link
              href="/"
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#FAFAFA',
                letterSpacing: '-0.02em',
                display: 'block',
                marginBottom: 12,
              }}
            >
              {siteName}
            </Link>
            <p style={{ fontSize: 13, color: '#808080', maxWidth: 280, lineHeight: 1.6 }}>
              Video Editor & Motion Designer
            </p>

            {/* Socials */}
            {socials.length > 0 && (
              <div style={{ display: 'flex', gap: 20, marginTop: 24 }}>
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12,
                      color: '#808080',
                      transition: 'color 200ms ease',
                      letterSpacing: '0.04em',
                      fontFamily: 'var(--font-geist-mono)',
                      fontStyle: 'italic',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
                    aria-label={s.label ?? s.platform}
                  >
                    {s.label ?? s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right — links */}
          <nav aria-label="Footer navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[...navItems, ...footerLinks].map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: 13,
                      color: '#808080',
                      transition: 'color 200ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #2A2A2A',
            paddingTop: 24,
            paddingBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 11,
              color: '#808080',
              letterSpacing: '0.04em',
            }}
          >
            {footerNote || `© ${year} ${siteName}. All rights reserved.`}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 11,
              color: '#2A2A2A',
              letterSpacing: '0.04em',
            }}
          >
            Crafted with intention.
          </span>
        </div>
      </div>
    </footer>
  )
}
