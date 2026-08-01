'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  items: NavItem[]
  siteName: string
}

export function Navbar({ items, siteName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 300ms ease, border-color 300ms ease',
        background: scrolled ? 'rgba(11,11,11,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2A2A2A' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#FAFAFA',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}
          aria-label={`${siteName} — back to home`}
        >
          {siteName}
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: 40,
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  fontSize: 13,
                  color: '#808080',
                  transition: 'color 200ms ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book a call CTA */}
        <Link
          href="#contact"
          className="btn btn-secondary hidden md:inline-flex"
          style={{ fontSize: 12, padding: '8px 18px' }}
        >
          Book a Call
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#FAFAFA',
            padding: 4,
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: '#0B0B0B',
            borderTop: '1px solid #2A2A2A',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, color: '#C2C2C2' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: 14, color: '#FAFAFA', fontWeight: 500 }}
          >
            Book a Call →
          </Link>
        </div>
      )}
    </header>
  )
}
