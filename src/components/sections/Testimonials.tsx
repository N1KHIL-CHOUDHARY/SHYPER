'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { VideoCard } from '@/components/ui/VideoCard'
import { getMediaUrl } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface TestimonialData {
  id: string
  name: string
  company?: string | null
  role?: string | null
  photo?: { url?: string | null; alt?: string | null } | null
  quote: string
  project?: string | null
  result?: string | null
  videoYoutubeId?: string | null
}

interface TestimonialsProps {
  testimonials: TestimonialData[]
}

function TestimonialItem({ t, index }: { t: TestimonialData; index: number }) {
  const photoUrl = t.photo?.url ? getMediaUrl(t.photo.url) : null
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="testimonial border-b border-neutral-800/80 pb-16 pt-12 first:pt-0 last:border-b-0"
      aria-label={`Testimonial from ${t.name}`}
      initial={reducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: t.videoYoutubeId ? '1fr 480px' : '1fr',
          gap: 64,
          alignItems: 'start',
        }}
        className="testimonial-grid"
      >
        <div>
          <div className="text-6xl font-serif text-neutral-700 leading-none select-none mb-4" aria-hidden>
            &ldquo;
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-normal text-neutral-100 leading-relaxed tracking-tight italic mb-8">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4 flex-wrap">
            {photoUrl && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-700">
                <Image
                  src={photoUrl}
                  alt={t.photo?.alt ?? t.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="text-base font-semibold text-neutral-100">{t.name}</div>
              <div className="font-mono italic text-xs text-neutral-400 mt-0.5 tracking-wide">
                {[t.role, t.company].filter(Boolean).join(' · ')}
              </div>
            </div>

            {t.result && (
              <div className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
                  {t.result}
                </span>
              </div>
            )}
          </div>

          {t.project && (
            <div className="mt-6 pt-6 border-t border-neutral-800/60 flex items-center gap-4">
              <span className="font-mono italic text-xs text-neutral-400 uppercase tracking-widest">
                Project
              </span>
              <span className="text-sm text-neutral-300">{t.project}</span>
            </div>
          )}
        </div>

        {t.videoYoutubeId && (
          <VideoCard youtubeId={t.videoYoutubeId} title={`${t.name}'s testimonial`} />
        )}
      </div>
    </motion.article>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section" aria-label="Testimonials">
        <div className="container">
          <hr className="divider mb-20" />
          <SectionLabel>Testimonials</SectionLabel>
          <p className="text-neutral-400 italic mt-6">
            Add your first testimonial in the CMS.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="section text-neutral-100" aria-label="Client Testimonials">
      <div className="container">
        <hr className="divider mb-20" />
        <SectionLabel>Testimonials</SectionLabel>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl md:text-5xl mt-2 mb-16">
          Results Clients Can&apos;t Stop Talking About
        </h2>

        <div className="flex flex-col gap-12">
          {testimonials.map((t, i) => (
            <TestimonialItem key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
