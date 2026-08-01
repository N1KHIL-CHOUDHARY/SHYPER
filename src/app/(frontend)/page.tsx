import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

// Sections
import { Hero }         from '@/components/sections/Hero'
import { About }        from '@/components/sections/About'
import { Work, WorkSkeleton } from '@/components/sections/Work'
import { Workflow }     from '@/components/sections/Workflow'
import { Services }     from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ }          from '@/components/sections/FAQ'
import { Contact }      from '@/components/sections/Contact'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload  = await getPayloadClient()
    const settings = (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as any
    return {
      title: settings?.seo?.title ?? 'SYPH4 — Video Editor & Motion Designer',
      description: settings?.seo?.description ?? 'Premium video editing and motion design.',
      openGraph: {
        title: settings?.seo?.title ?? 'SYPH4',
        description: settings?.seo?.description ?? '',
        type: 'website',
      },
    }
  } catch {
    return {}
  }
}

// ─── Data Fetchers (individual — for Suspense streaming) ─────────────────────

async function HeroSection() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'hero', depth: 2 }).catch(() => null)
  return <Hero data={(data as any) ?? {}} />
}

async function AboutSection() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'about', depth: 2 }).catch(() => null)
  return <About data={(data as any) ?? {}} />
}

async function WorkSection() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { and: [{ showOnHomepage: { equals: true } }, { _status: { equals: 'published' } }] },
    sort: 'order',
    limit: 20,
    depth: 1,
  }).catch(() => ({ docs: [] }))
  return <Work projects={result.docs as any[]} />
}

async function WorkflowSection() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'workflow', depth: 0 }).catch(() => null)
  return <Workflow data={(data as any) ?? {}} />
}

async function ServicesSection() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 12,
    depth: 0,
  }).catch(() => ({ docs: [] }))
  return <Services services={result.docs as any[]} />
}

async function TestimonialsSection() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    sort: 'order',
    limit: 10,
    depth: 1,
  }).catch(() => ({ docs: [] }))
  return <Testimonials testimonials={result.docs as any[]} />
}

async function FAQSection() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'faq',
    sort: 'order',
    limit: 20,
    depth: 0,
  }).catch(() => ({ docs: [] }))
  return <FAQ items={result.docs as any[]} />
}

async function ContactSection() {
  const payload = await getPayloadClient()
  const data = await payload.findGlobal({ slug: 'contact', depth: 0 }).catch(() => null)
  return <Contact data={(data as any) ?? {}} />
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<WorkSkeleton />}>
        <WorkSection />
      </Suspense>

      <Suspense fallback={null}>
        <WorkflowSection />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={null}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    </>
  )
}
