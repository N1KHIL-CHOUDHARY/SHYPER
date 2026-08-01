'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, X } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getMediaUrl } from '@/lib/utils'
import { SkeletonProjectRow } from '@/components/ui/SkeletonCard'

interface ProjectData {
  id: string
  title: string
  slug: string
  category?: string | null
  year?: number | null
  description?: string | null
  thumbnail?: { url?: string | null; alt?: string | null } | null
  tags?: Array<{ tag?: string | null }> | null
  youtubeUrl?: string | null
}

interface WorkProps {
  projects: ProjectData[]
}

function getYouTubeEmbedUrl(url?: string | null) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : null
}

export function Work({ projects }: WorkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  if (projects.length === 0) return null

  return (
    <section id="work" className="section relative" aria-label="Selected Work">
      <div className="container relative z-10">
        <hr className="divider mb-20" />
        <div className="flex items-baseline justify-between mb-16">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold text-neutral-50 tracking-tight leading-tight mt-2">
              Project Archive
            </h2>
          </div>
          <span className="font-mono italic text-xs text-neutral-800 tracking-wider">
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>
      </div>

      <div ref={containerRef} className="container relative pb-32">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05
          return (
            <Card
              key={project.id}
              project={project}
              i={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              onOpenVideo={(url) => setActiveVideo({ url, title: project.title })}
            />
          )
        })}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Card({
  project,
  i,
  progress,
  range,
  targetScale,
  onOpenVideo,
}: {
  project: ProjectData
  i: number
  progress: any
  range: number[]
  targetScale: number
  onOpenVideo: (embedUrl: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])
  const imageUrl = project.thumbnail?.url ? getMediaUrl(project.thumbnail.url) : ''
  const embedUrl = getYouTubeEmbedUrl(project.youtubeUrl)

  return (
    <div
      ref={containerRef}
      className="sticky top-24 flex items-center justify-center min-h-[70vh] mb-24"
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 md:p-12 backdrop-blur-md flex flex-col md:flex-row gap-8 md:gap-16 shadow-2xl"
      >
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="font-mono italic text-xs text-neutral-500 uppercase tracking-widest mb-4 block">
              {String(i + 1).padStart(2, '0')} — {project.category ?? 'Project'}
            </span>
            <h3 className="text-3xl md:text-5xl font-semibold text-neutral-50 mb-6 leading-tight">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
                {project.description}
              </p>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full border border-neutral-800 text-xs text-neutral-400 bg-neutral-900/50"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-3 text-neutral-50 hover:text-white transition-colors w-fit group"
            >
              <span className="font-medium">View Case Study</span>
              <span className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {embedUrl && (
              <button
                onClick={() => onOpenVideo(embedUrl)}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all text-sm font-medium"
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </button>
            )}
          </div>
        </div>

        <div
          onClick={() => embedUrl && onOpenVideo(embedUrl)}
          className={`flex-1 relative rounded-2xl overflow-hidden aspect-video md:aspect-auto bg-neutral-950 border border-neutral-800 group ${
            embedUrl ? 'cursor-pointer' : ''
          }`}
        >
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={project.thumbnail?.alt ?? project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {embedUrl && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-xs">
              NO IMAGE
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function WorkSkeleton() {
  return (
    <section id="work" className="section" aria-label="Selected Work loading">
      <div className="container">
        <hr className="divider mb-20" />
        <SectionLabel>Selected Work</SectionLabel>
        <div className="mt-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonProjectRow key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}