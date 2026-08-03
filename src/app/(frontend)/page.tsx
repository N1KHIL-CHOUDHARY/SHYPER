import { Suspense, ComponentProps } from 'react'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Hero, type HeroData } from '@/components/sections/Hero'
import { Reel } from '@/components/sections/Reel'
import { ClientLogos } from '@/components/sections/ClientLogos'
import { About } from '@/components/sections/About'
import { Work, WorkSkeleton } from '@/components/sections/Work'
import { Workflow } from '@/components/sections/Workflow'
import { Services } from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

const DEFAULT_HERO_DATA: HeroData = {
  greeting: "Hello, I'm SYPH4",
  name: 'SYPH4',
  tagline:
    'High-retention video editing, cinematic color grading, and motion design for tech brands and top creators.',
  roles: [{ role: 'Senior Video Editor' }, { role: 'Motion Designer' }, { role: 'Colorist' }],
  ctaPrimary: { label: 'Book 15-Min Call', href: '#contact' },
  ctaSecondary: { label: 'Watch Selected Work ↓', href: '#work' },
  stats: [
    { value: '50M+', label: 'Total Views' },
    { value: '120+', label: 'Projects Delivered' },
    { value: '99%', label: 'Client Satisfaction' },
  ],
  availableForWork: true,
  reelYoutubeId: 'dQw4w9WgXcQ',
}

const DEFAULT_REEL_DATA = {
  reelYoutubeId: 'dQw4w9WgXcQ',
  heading: 'Featured Showreel',
  subtext: 'A collection of high-impact video edits, motion graphics, and sound design.',
}

const DEFAULT_CLIENT_LOGOS: ComponentProps<typeof ClientLogos>['logos'] = [
  { id: 'logo-1', name: 'Tech Brand Alpha' },
  { id: 'logo-2', name: 'Creator Studio' },
  { id: 'logo-3', name: 'Venture Capital' },
  { id: 'logo-4', name: 'Media Labs' },
  { id: 'logo-5', name: 'NextGen AI' },
]

const DEFAULT_ABOUT_DATA: ComponentProps<typeof About>['data'] = {
  heading: 'Crafting visual stories that hold attention.',
  paragraphs: [
    {
      text: 'I specialize in pacing, narrative structure, and high-conversion motion graphics that turn casual viewers into loyal subscribers and customers.',
    },
    {
      text: 'With over 5 years of experience collaborating with top-tier creators and digital brands, I craft frame-by-frame visual experiences tailored to your audience.',
    },
  ],
  stats: [
    { value: '5+ Yrs', label: 'Industry Experience' },
    { value: '48h', label: 'Avg Turnaround' },
  ],
}

const DEFAULT_WORK_PROJECTS: ComponentProps<typeof Work>['projects'] = [
  {
    id: 'proj-1',
    title: 'High-Retention Tech Showcase',
    slug: 'tech-showcase',
    category: 'YouTube',
    year: 2024,
    youtubeId: 'dQw4w9WgXcQ',
    showOnHomepage: true,
    order: 1,
    accentColor: '#5EEA7A',
    resultBadge: '+1.2M Views',
    tags: [{ tag: 'Editing' }, { tag: 'Motion Design' }],
  },
  {
    id: 'proj-2',
    title: 'SaaS Product Launch Reel',
    slug: 'saas-launch',
    category: 'Ads',
    year: 2024,
    youtubeId: 'dQw4w9WgXcQ',
    showOnHomepage: true,
    order: 2,
    accentColor: '#3B82F6',
    resultBadge: '3.4x ROAS',
    tags: [{ tag: 'Color Grading' }, { tag: 'VFX' }],
  },
]

const DEFAULT_WORKFLOW_DATA: ComponentProps<typeof Workflow>['data'] = {
  heading: 'Streamlined Production Workflow',
  steps: [
    {
      title: 'Discovery & Strategy',
      description: 'Analyzing target demographics, visual guidelines, and key retention drop-offs.',
    },
    {
      title: 'Assembly & Motion Graphics',
      description: 'Pacing cuts, adding dynamic text overlays, and designing motion elements.',
    },
    {
      title: 'Color & Sound Design',
      description: 'Applying cinematic color grading and multi-layered sound design for maximum impact.',
    },
    {
      title: 'Final Polish & Delivery',
      description: 'Refining details, generating export variants for multiple platforms, and quick revisions.',
    },
  ],
}

const DEFAULT_SERVICES_DATA: ComponentProps<typeof Services>['services'] = [
  {
    id: 'serv-1',
    title: 'Retention-Driven Editing',
    description:
      'Pacing, pattern interrupts, sound design, and custom graphics engineered to maximize watch time.',
    icon: 'TrendingUp',
    size: 'large',
    order: 1,
  },
  {
    id: 'serv-2',
    title: 'Social Ad Creatives',
    description:
      'Scroll-stopping hooks, fast-cut narrative edits, and direct-response text overlays.',
    icon: 'Target',
    size: 'medium',
    order: 2,
  },
  {
    id: 'serv-3',
    title: 'Cinematic Color Grading',
    description:
      'Custom LUT development, skin tone perfection, and film look emulation in DaVinci Resolve.',
    icon: 'Clapperboard',
    size: 'medium',
    order: 3,
  },
]

const DEFAULT_TESTIMONIALS_DATA: ComponentProps<typeof Testimonials>['testimonials'] = [
  {
    id: 'test-1',
    name: 'Alex Rivera',
    role: 'Founder',
    company: 'Apex Media',
    quote:
      'Working with SYPH4 completely transformed our retention metrics. Watch time jumped by 42% on our main channel within two weeks.',
    result: '+42% Watch Time',
    project: 'YouTube Channel Overhaul',
  },
]

const DEFAULT_FAQ_DATA: ComponentProps<typeof FAQ>['items'] = [
  {
    id: 'faq-1',
    question: 'What is your typical project turnaround time?',
    answer:
      'Standard video edits take 48 to 72 hours. Larger productions or multi-video packages are scheduled with milestones.',
  },
  {
    id: 'faq-2',
    question: 'What software do you use for editing and color grading?',
    answer:
      'I primarily work in Premiere Pro, After Effects for motion graphics, and DaVinci Resolve Studio for color grading.',
  },
]

const DEFAULT_CONTACT_DATA: ComponentProps<typeof Contact>['data'] = {
  heading: "Let's build something worth watching.",
  subtext:
    'Have a project in mind or need dedicated video editing support? Drop a message or book a call.',
  email: 'contact@syph4.com',
  whatsapp: 'https://wa.me/1234567890',
  calendly: 'https://calendly.com',
  socials: [
    { platform: 'Twitter / X', url: 'https://x.com', label: 'Twitter / X' },
    { platform: 'YouTube', url: 'https://youtube.com', label: 'YouTube' },
  ],
}

function SectionSkeleton() {
  return (
    <section className="section py-20" aria-hidden="true">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="h-4 w-28 bg-neutral-800 rounded animate-pulse mb-4" />
        <div className="h-10 w-72 bg-neutral-800 rounded animate-pulse mb-8" />
        <div className="h-48 w-full bg-neutral-900 rounded-2xl border border-neutral-800 animate-pulse" />
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
    const seo = (settings as { seo?: { title?: string; description?: string } })?.seo
    return {
      title: seo?.title ?? 'SYPH4 — Video Editor & Motion Designer',
      description:
        seo?.description ?? 'High-retention video editing, cinematic color grading, and motion design.',
      openGraph: {
        title: seo?.title ?? 'SYPH4 — Video Editor & Motion Designer',
        description:
          seo?.description ?? 'High-retention video editing, cinematic color grading, and motion design.',
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'SYPH4 — Video Editor & Motion Designer',
      description: 'High-retention video editing, cinematic color grading, and motion design.',
      openGraph: {
        title: 'SYPH4 — Video Editor & Motion Designer',
        description: 'High-retention video editing, cinematic color grading, and motion design.',
        type: 'website',
      },
    }
  }
}

async function HeroSection() {
  let data: HeroData | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.findGlobal({ slug: 'hero', depth: 2 })
    if (res && typeof res === 'object') {
      data = res as unknown as HeroData
    }
  } catch {}

  return <Hero data={data && Object.keys(data).length > 0 ? data : DEFAULT_HERO_DATA} />
}

async function ReelSection() {
  let settings: { reelYoutubeId?: string; reelHeading?: string; reelSubtext?: string } | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    if (res && typeof res === 'object') {
      settings = res as { reelYoutubeId?: string; reelHeading?: string; reelSubtext?: string }
    }
  } catch {}

  const reelData = {
    reelYoutubeId: settings?.reelYoutubeId || DEFAULT_REEL_DATA.reelYoutubeId,
    heading: settings?.reelHeading || DEFAULT_REEL_DATA.heading,
    subtext: settings?.reelSubtext || DEFAULT_REEL_DATA.subtext,
  }

  return <Reel data={reelData} />
}

async function ClientLogosSection() {
  let logos: ComponentProps<typeof ClientLogos>['logos'] = []
  try {
    const payload = await getPayloadClient()
    const settings = (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as {
      clientLogos?: Array<{ name: string; logo?: { url?: string | null; alt?: string | null } }>
    } | null
    if (settings?.clientLogos && Array.isArray(settings.clientLogos) && settings.clientLogos.length > 0) {
      logos = settings.clientLogos.map((l, i) => ({
        id: String(i),
        name: l.name,
        logo: l.logo ?? null,
      }))
    }
  } catch {}

  return <ClientLogos logos={logos.length > 0 ? logos : DEFAULT_CLIENT_LOGOS} />
}

async function AboutSection() {
  let data: ComponentProps<typeof About>['data'] | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.findGlobal({ slug: 'about', depth: 2 })
    if (res && typeof res === 'object') {
      data = res as ComponentProps<typeof About>['data']
    }
  } catch {}

  return (
    <About
      data={
        data && (data.heading || (data.paragraphs && data.paragraphs.length > 0))
          ? data
          : DEFAULT_ABOUT_DATA
      }
    />
  )
}

async function WorkSection() {
  let projects: ComponentProps<typeof Work>['projects'] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { and: [{ showOnHomepage: { equals: true } }, { _status: { equals: 'published' } }] },
      sort: 'order',
      limit: 20,
      depth: 1,
    })
    if (result && Array.isArray(result.docs)) {
      projects = result.docs as unknown as ComponentProps<typeof Work>['projects']
    }
  } catch {}

  return <Work projects={projects.length > 0 ? projects : DEFAULT_WORK_PROJECTS} />
}

async function WorkflowSection() {
  let data: ComponentProps<typeof Workflow>['data'] | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.findGlobal({ slug: 'workflow', depth: 0 })
    if (res && typeof res === 'object') {
      data = res as ComponentProps<typeof Workflow>['data']
    }
  } catch {}

  return (
    <Workflow
      data={data && data.steps && data.steps.length > 0 ? data : DEFAULT_WORKFLOW_DATA}
    />
  )
}

async function ServicesSection() {
  let services: ComponentProps<typeof Services>['services'] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 12, depth: 0 })
    if (result && Array.isArray(result.docs)) {
      services = result.docs as unknown as ComponentProps<typeof Services>['services']
    }
  } catch {}

  return <Services services={services.length > 0 ? services : DEFAULT_SERVICES_DATA} />
}

async function TestimonialsSection() {
  let testimonials: ComponentProps<typeof Testimonials>['testimonials'] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'testimonials', sort: 'order', limit: 10, depth: 1 })
    if (result && Array.isArray(result.docs)) {
      testimonials = result.docs as unknown as ComponentProps<typeof Testimonials>['testimonials']
    }
  } catch {}

  return (
    <Testimonials
      testimonials={testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS_DATA}
    />
  )
}

async function FAQSection() {
  let items: ComponentProps<typeof FAQ>['items'] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'faq', sort: 'order', limit: 20, depth: 0 })
    if (result && Array.isArray(result.docs)) {
      items = result.docs as unknown as ComponentProps<typeof FAQ>['items']
    }
  } catch {}

  return <FAQ items={items.length > 0 ? items : DEFAULT_FAQ_DATA} />
}

async function ContactSection() {
  let data: ComponentProps<typeof Contact>['data'] | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.findGlobal({ slug: 'contact', depth: 0 })
    if (res && typeof res === 'object') {
      data = res as ComponentProps<typeof Contact>['data']
    }
  } catch {}

  return (
    <Contact
      data={data && (data.heading || data.email || data.calendly) ? data : DEFAULT_CONTACT_DATA}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ReelSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ClientLogosSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<WorkSkeleton />}>
        <WorkSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WorkflowSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
