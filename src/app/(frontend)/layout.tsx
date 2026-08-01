import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { getPayloadClient } from '@/lib/payload'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PreloaderClient } from '@/components/layout/PreloaderClient'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'),
  title: {
    default: 'SYPH4 — Video Editor & Motion Designer',
    template: '%s — SYPH4',
  },
  description: 'Premium video editing and motion design. Helping creators produce videos people cannot stop watching.',
  robots: { index: true, follow: true },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()

  // Fetch globals in parallel
  const [settings, contact] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 0 }).catch(() => null),
    payload.findGlobal({ slug: 'contact', depth: 1 }).catch(() => null),
  ])

  const siteName  = (settings as any)?.siteName ?? 'SYPH4'
  const navItems  = (settings as any)?.navItems  ?? []
  const footerLinks = (settings as any)?.footerLinks ?? []
  const footerNote  = (settings as any)?.footerNote ?? `© ${new Date().getFullYear()} SYPH4`
  const socials   = (contact as any)?.socials ?? []

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for YouTube thumbnail CDN */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PreloaderClient />
        <Navbar items={navItems} siteName={siteName} />
        <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
          {children}
        </main>
        <Footer
          siteName={siteName}
          navItems={navItems}
          footerLinks={footerLinks}
          footerNote={footerNote}
          socials={socials}
        />
      </body>
    </html>
  )
}
