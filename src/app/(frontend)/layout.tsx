import { getPayloadClient } from '@/lib/payload'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PreloaderClient } from '@/components/layout/PreloaderClient'

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
    <>
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
    </>
  )
}
