'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectRow } from '@/components/ui/ProjectRow'
import { SkeletonProjectRow } from '@/components/ui/SkeletonCard'

interface ProjectData {
  id: string
  title: string
  slug: string
  index?: string | null
  category?: string | null
  year?: number | null
  description?: string | null
  youtubeId?: string | null
  overview?: {
    software?: Array<{ name: string }> | null
  } | null
  results?: Array<{ metric: string; value: string }> | null
}

interface WorkProps {
  projects: ProjectData[]
}

export function Work({ projects }: WorkProps) {
  if (projects.length === 0) {
    return (
      <section id="work" className="section" aria-label="Selected Work">
        <div className="container">
          <hr className="divider" style={{ marginBottom: 80 }} />
          <SectionLabel>Selected Work</SectionLabel>
          <div
            style={{
              paddingTop: 80,
              paddingBottom: 80,
              textAlign: 'center',
              color: '#808080',
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 13,
            }}
          >
            No projects published yet. Add your first project in the CMS.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="work" className="section" aria-label="Selected Work">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 48,
          }}
        >
          <div>
            <SectionLabel>Selected Work</SectionLabel>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginTop: 8,
              }}
            >
              Project Archive
            </h2>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 12,
              color: '#2A2A2A',
              letterSpacing: '0.06em',
            }}
          >
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>

        {/* Archive list */}
        <div role="list" aria-label="Project list">
          {projects.map((project, i) => (
            <div key={project.id} role="listitem">
              <ProjectRow
                index={project.index ?? String(i + 1).padStart(2, '0')}
                title={project.title}
                category={project.category}
                year={project.year}
                slug={project.slug}
                description={project.description}
                youtubeId={project.youtubeId}
                software={project.overview?.software ?? []}
                results={project.results ?? []}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorkSkeleton() {
  return (
    <section id="work" className="section" aria-label="Selected Work loading">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <SectionLabel>Selected Work</SectionLabel>
        <div style={{ marginTop: 48 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonProjectRow key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
