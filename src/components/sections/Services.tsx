'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import {
  Film,
  Wand2,
  Monitor,
  Gamepad2,
  GraduationCap,
  VideoIcon,
  Palette,
  Volume2,
  Sparkles,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Film,
  Wand2,
  Monitor,
  Gamepad2,
  GraduationCap,
  Video: VideoIcon,
  Palette,
  Volume2,
}

interface ServiceData {
  id: string
  title: string
  description?: string | null
  icon?: string | null
  size?: 'large' | 'medium' | 'small' | null
  order?: number | null
}

interface ServicesProps {
  services: ServiceData[]
}

function ServiceCard({ service }: { service: ServiceData }) {
  const Icon = service.icon ? ICON_MAP[service.icon] ?? Film : Film
  const isLarge = service.size === 'large'
  const isMedium = service.size === 'medium'

  const gridSpan = isLarge
    ? 'col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2'
    : isMedium
    ? 'col-span-1 md:col-span-2 lg:col-span-1'
    : 'col-span-1'

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-7 md:p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-neutral-700/80 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-black/60 ${gridSpan}`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neutral-100/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-30" />

      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/90 p-3.5 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-neutral-700 group-hover:bg-neutral-800">
            <Icon className="h-6 w-6 text-neutral-400 transition-colors duration-300 group-hover:text-white" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-300" />
        </div>

        <h3
          className={`font-semibold tracking-tight text-neutral-100 transition-colors duration-300 group-hover:text-white ${
            isLarge ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-2.5'
          }`}
        >
          {service.title}
        </h3>

        {service.description && (
          <p className="text-sm leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
            {service.description}
          </p>
        )}
      </div>

    </div>
  )
}

export function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-16 w-full border-t border-neutral-800/80" />
          <SectionLabel>Services</SectionLabel>
          <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-900/20 py-20 text-center">
            <Sparkles className="mb-3 h-8 w-8 text-neutral-600" />
            <p className="text-sm text-neutral-500">
              No services found. Add your services in the CMS.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const sorted = [...services].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  )

  return (
    <section id="services" className="py-24 text-neutral-100">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16 w-full border-t border-neutral-800/80" />

        <div className="mb-14 flex flex-col gap-3">
          <SectionLabel>Services</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl md:text-5xl">
            What I Do
          </h2>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}