import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { CaseStudyHero }     from '@/components/case-study/CaseStudyHero'
import { CaseStudyOverview } from '@/components/case-study/CaseStudyOverview'
import { CaseStudyContent }  from '@/components/case-study/CaseStudyContent'
import { RelatedProjects }   from '@/components/case-study/RelatedProjects'

type Props = { params: Promise<{ slug: string }> }

// Pre-render all published project pages at build time
export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      limit: 200,
      depth: 0,
    })
    return result.docs.map((p: any) => ({ slug: p.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug }  = await params
    const payload   = await getPayloadClient()
    const result    = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const project = result.docs[0] as any
    if (!project) return {}

    return {
      title: project.seo?.title ?? project.title,
      description: project.seo?.description ?? project.description,
      openGraph: {
        title:       project.seo?.title ?? project.title,
        description: project.seo?.description ?? project.description ?? '',
        type: 'article',
      },
    }
  } catch {
    return {}
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const payload  = await getPayloadClient()

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  }).catch(() => ({ docs: [] }))

  const project = result.docs[0] as any
  if (!project) notFound()

  // Fetch related projects
  const relatedIds: string[] = (project.relatedProjects ?? []).map((p: any) =>
    typeof p === 'string' ? p : p.id,
  )

  const relatedResult = relatedIds.length > 0
    ? await payload.find({
        collection: 'projects',
        where: { id: { in: relatedIds } },
        limit: 3,
        depth: 1,
      }).catch(() => ({ docs: [] }))
    : { docs: [] }

  return (
    <article>
      {/* Back link */}
      <div
        className="container"
        style={{ paddingTop: 96, paddingBottom: 0, display: 'flex' }}
      >
        <Link
          href="/#work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 12,
            color: '#808080',
            letterSpacing: '0.06em',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Work
        </Link>
      </div>

      <CaseStudyHero
        title={project.title}
        category={project.category}
        year={project.year}
        youtubeId={project.youtubeId}
        coverImage={project.coverImage}
      />

      <div style={{ borderTop: '1px solid #2A2A2A', marginTop: 40 }} />

      <CaseStudyOverview
        overview={project.overview ?? {}}
        results={project.results}
      />

      {project.content && project.content.length > 0 && (
        <>
          <div className="container">
            <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', marginBottom: 64 }} />
          </div>
          <CaseStudyContent content={project.content} />
        </>
      )}

      <RelatedProjects projects={relatedResult.docs as any[]} />
    </article>
  )
}
