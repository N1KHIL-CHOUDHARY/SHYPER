'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getMediaUrl, getYoutubeThumbnail } from '@/lib/utils'

interface RelatedProject {
  id: string
  title: string
  slug: string
  category?: string | null
  year?: number | null
  youtubeId?: string | null
  thumbnail?: { url?: string | null; alt?: string | null } | null
}

interface RelatedProjectsProps {
  projects: RelatedProject[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects || projects.length === 0) return null

  return (
    <section aria-label="Related projects" style={{ paddingTop: 80, paddingBottom: 96 }}>
      <div className="container">
        <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', marginBottom: 64 }} />
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 10,
            color: '#808080',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          Related Projects
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(projects.length, 3)}, 1fr)`,
            gap: 24,
          }}
          className="related-grid"
        >
          {projects.map((project) => {
            const thumbUrl = project.thumbnail?.url
              ? getMediaUrl(project.thumbnail.url)
              : project.youtubeId
              ? getYoutubeThumbnail(project.youtubeId, 'hqdefault')
              : null

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                style={{ display: 'block', textDecoration: 'none' }}
                aria-label={`View case study: ${project.title}`}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    background: '#111111',
                    marginBottom: 16,
                  }}
                >
                  {thumbUrl && (
                    <Image
                      src={thumbUrl}
                      alt={project.thumbnail?.alt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 400ms ease',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                  )}
                </div>

                {/* Meta */}
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontStyle: 'italic',
                    fontSize: 10,
                    color: '#808080',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  {[project.category, project.year].filter(Boolean).join(' · ')}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#C2C2C2',
                    letterSpacing: '-0.01em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'color 200ms ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#FAFAFA')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#C2C2C2')}
                >
                  {project.title}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </h3>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
