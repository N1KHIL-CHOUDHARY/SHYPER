'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, X, Film } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getMediaUrl } from '@/lib/utils'
import { SkeletonProjectRow } from '@/components/ui/SkeletonCard'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface ProjectData {
  id: string
  title: string
  slug: string
  category?: string | null
  year?: number | null
  thumbnail?: { url?: string | null; alt?: string | null } | null
  tags?: Array<{ tag?: string | null }> | null
  youtubeUrl?: string | null
  youtubeId?: string | null
  showOnHomepage?: boolean | null
  order?: number | null
  index?: number | null
  accentColor?: string | null
  resultBadge?: string | null
  aspectRatio?: '16:9' | '9:16' | string | null
  previewVideoUrl?: string | null
  results?: Array<{ metric: string; value: string }> | null
}

interface WorkProps {
  projects: ProjectData[]
}

function getYouTubeEmbedUrl(project: ProjectData) {
  const url = project.youtubeUrl
  const id = project.youtubeId
  if (id && id.length === 11) return `https://www.youtube.com/embed/${id}?autoplay=1`
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : null
}

export function Work({ projects }: WorkProps) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const gridItems = useMemo(
    () => projects.filter((p) => p.showOnHomepage).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [projects]
  )

  const categories = useMemo(() => {
    const cats = Array.from(new Set(gridItems.map((p) => p.category).filter(Boolean))) as string[]
    return cats.length > 1 ? ['All', ...cats] : []
  }, [gridItems])

  const filtered = useMemo(
    () => (activeFilter === 'All' ? gridItems : gridItems.filter((p) => p.category === activeFilter)),
    [gridItems, activeFilter]
  )

  if (gridItems.length === 0) return null

  return (
    <section id="work" className="section" aria-label="Selected Work">
      <div className="container">
        <hr className="divider mb-20" />
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold text-neutral-50 tracking-tight leading-tight mt-2">
              Recent Projects
            </h2>
          </div>
          <span className="font-mono italic text-xs text-neutral-600 tracking-wider">
            {String(gridItems.length).padStart(2, '0')} projects
          </span>
        </div>

        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 100,
                  border: `1px solid ${activeFilter === cat ? '#FAFAFA' : '#2A2A2A'}`,
                  background: activeFilter === cat ? '#FAFAFA' : 'transparent',
                  color: activeFilter === cat ? '#0B0B0B' : '#808080',
                  fontFamily: 'var(--font-geist-mono)',
                  fontStyle: 'italic',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                i={i}
                onOpenVideo={(url) => setActiveVideo({ url, title: project.title })}
              />
            ))}
          </AnimatePresence>
        </div>
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
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
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

function ProjectCard({
  project,
  i,
  onOpenVideo,
}: {
  project: ProjectData
  i: number
  onOpenVideo: (embedUrl: string) => void
}) {
  const reducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const imageUrl = project.thumbnail?.url ? getMediaUrl(project.thumbnail.url) : ''
  const embedUrl = getYouTubeEmbedUrl(project)
  const displayIndex = project.index ?? i + 1
  const accent = project.accentColor || undefined

  const badge =
    project.resultBadge ||
    (project.results?.[0]?.value
      ? `${project.results[0].value} ${project.results[0].metric ?? ''}`.trim()
      : '+2.4M Views')

  const isVertical =
    project.aspectRatio === '9:16' ||
    project.category === 'Shorts' ||
    project.category === 'Reels' ||
    project.category === 'TikTok'

  const aspectClass = isVertical ? 'aspect-[9/16]' : 'aspect-video'

  return (
    <motion.article
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => embedUrl && onOpenVideo(embedUrl)}
        className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-300 ease-in-out group-hover:border-neutral-700 group-hover:-translate-y-1 ${
          embedUrl ? 'cursor-pointer' : ''
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.thumbnail?.alt ?? project.title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 flex flex-col items-center justify-center gap-2 text-neutral-600">
            <Film className="w-8 h-8 opacity-40" />
            <span className="font-mono text-[10px] tracking-widest uppercase">Video Preview</span>
          </div>
        )}

        {isHovered && project.previewVideoUrl && (
          <video
            src={project.previewVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {embedUrl && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          {accent && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden />}
          <span className="font-mono italic text-[10px] text-neutral-200 tracking-widest">
            {String(displayIndex).padStart(2, '0')}
          </span>
        </div>

        {badge && (
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40">
            <span className="font-mono font-semibold text-[10px] text-emerald-400 tracking-wider">{badge}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono italic text-[11px] text-neutral-500 uppercase tracking-widest block mb-1.5">
            {project.category ?? 'Project'}
            {project.year ? ` · ${project.year}` : ''}
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-neutral-50 leading-snug tracking-tight truncate transition-colors duration-200 group-hover:text-white">
            {project.title}
          </h3>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          className="shrink-0 w-8 h-8 mt-0.5 rounded-full border border-neutral-800 text-neutral-400 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:border-neutral-600 group-hover:text-neutral-50 group-hover:translate-x-0.5"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 4).map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-full border border-neutral-700 text-[10px] text-neutral-400">
              {t.tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}

export function WorkSkeleton() {
  return (
    <section id="work" className="section" aria-label="Selected Work loading">
      <div className="container">
        <hr className="divider mb-20" />
        <SectionLabel>Selected Work</SectionLabel>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonProjectRow key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}