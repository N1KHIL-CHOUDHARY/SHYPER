import Image from 'next/image'
import { VideoCard } from '@/components/ui/VideoCard'
import { getMediaUrl } from '@/lib/utils'

// ─── Block Types ───────────────────────────────────────────────────────────────

interface ParagraphBlock    { blockType: 'paragraph';   text: string; size?: 'default' | 'large' | 'small' }
interface HeadingBlock      { blockType: 'heading';     text: string; level?: 'h2' | 'h3' | 'h4' }
interface ImageBlockData    { blockType: 'imageBlock';  image: { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | null; caption?: string | null; size?: 'full' | 'medium' | 'small' }
interface GalleryBlockData  { blockType: 'gallery';     images: Array<{ image: { url?: string | null; alt?: string | null } | null; caption?: string | null }>; columns?: '2' | '3' }
interface QuoteBlock        { blockType: 'quote';       text: string; attribution?: string | null }
interface CalloutBlock      { blockType: 'callout';     type?: 'info' | 'tip' | 'warning' | 'result'; text: string }
interface StatisticsBlock   { blockType: 'statistics';  stats: Array<{ value: string; label: string }> }
interface BeforeAfterBlock  { blockType: 'beforeAfter'; beforeImage: { url?: string | null; alt?: string | null } | null; afterImage: { url?: string | null; alt?: string | null } | null; beforeLabel?: string | null; afterLabel?: string | null; caption?: string | null }
interface VideoBlockData    { blockType: 'video';       youtubeId: string; caption?: string | null }
interface SpacerBlock       { blockType: 'spacer';      size?: 'small' | 'medium' | 'large' }

type Block =
  | ParagraphBlock | HeadingBlock | ImageBlockData | GalleryBlockData
  | QuoteBlock | CalloutBlock | StatisticsBlock | BeforeAfterBlock
  | VideoBlockData | SpacerBlock

// ─── Block Renderers ────────────────────────────────────────────────────────────

const FONT_SIZES = { default: 16, large: 20, small: 13 }

function RenderBlock({ block }: { block: Block }) {
  switch (block.blockType) {
    case 'paragraph':
      return (
        <p
          style={{
            fontSize: FONT_SIZES[block.size ?? 'default'],
            color: block.size === 'small' ? '#808080' : '#C2C2C2',
            lineHeight: 1.75,
            maxWidth: 720,
          }}
        >
          {block.text}
        </p>
      )

    case 'heading': {
      const Tag = block.level ?? 'h2'
      const sizes = { h2: 36, h3: 26, h4: 20 }
      return (
        <Tag
          style={{
            fontSize: sizes[block.level ?? 'h2'],
            fontWeight: 600,
            color: '#FAFAFA',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {block.text}
        </Tag>
      )
    }

    case 'imageBlock': {
      if (!block.image?.url) return null
      const url = getMediaUrl(block.image.url)
      const maxWidths = { full: '100%', medium: '70%', small: '40%' }
      return (
        <figure style={{ maxWidth: maxWidths[block.size ?? 'full'] }}>
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#111111' }}>
            <Image
              src={url}
              alt={block.image.alt ?? 'Project image'}
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          {block.caption && (
            <figcaption
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontStyle: 'italic',
                fontSize: 11,
                color: '#808080',
                marginTop: 12,
                letterSpacing: '0.04em',
              }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'gallery': {
      const cols = block.columns === '3' ? 3 : 2
      return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
          {block.images.map((img, i) => {
            if (!img.image?.url) return null
            const url = getMediaUrl(img.image.url)
            return (
              <figure key={i}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#111111' }}>
                  <Image src={url} alt={img.image.alt ?? `Gallery image ${i + 1}`} fill sizes="50vw" style={{ objectFit: 'cover' }} />
                </div>
              </figure>
            )
          })}
        </div>
      )
    }

    case 'quote':
      return (
        <blockquote style={{ borderLeft: '2px solid #FAFAFA', paddingLeft: 32, margin: '8px 0' }}>
          <p style={{ fontSize: 22, color: '#FAFAFA', fontStyle: 'italic', lineHeight: 1.55, fontWeight: 400, letterSpacing: '-0.01em' }}>
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite style={{ display: 'block', fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 11, color: '#808080', marginTop: 12, letterSpacing: '0.06em' }}>
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      )

    case 'callout':
      return (
        <div className={`callout ${block.type ?? 'info'}`}>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: '#C2C2C2' }}>{block.text}</p>
        </div>
      )

    case 'statistics':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 32, padding: '40px 0' }}>
          {block.stats.map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#FAFAFA', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 10, color: '#808080', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )

    case 'beforeAfter': {
      const beforeUrl = block.beforeImage?.url ? getMediaUrl(block.beforeImage.url) : null
      const afterUrl  = block.afterImage?.url  ? getMediaUrl(block.afterImage.url)  : null
      if (!beforeUrl || !afterUrl) return null
      return (
        <figure>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[{ url: beforeUrl, label: block.beforeLabel ?? 'Before', alt: block.beforeImage?.alt },
              { url: afterUrl,  label: block.afterLabel  ?? 'After',  alt: block.afterImage?.alt }].map((side) => (
              <div key={side.label}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#111111' }}>
                  <Image src={side.url} alt={side.alt ?? side.label} fill sizes="50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 10, color: '#808080', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 8 }}>
                  {side.label}
                </div>
              </div>
            ))}
          </div>
          {block.caption && (
            <figcaption style={{ fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 11, color: '#808080', marginTop: 12 }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'video':
      return (
        <figure>
          <VideoCard youtubeId={block.youtubeId} />
          {block.caption && (
            <figcaption style={{ fontFamily: 'var(--font-geist-mono)', fontStyle: 'italic', fontSize: 11, color: '#808080', marginTop: 12 }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'spacer': {
      const heights = { small: 32, medium: 64, large: 128 }
      return <div style={{ height: heights[block.size ?? 'medium'] }} aria-hidden="true" />
    }

    default:
      return null
  }
}

interface CaseStudyContentProps {
  content: Block[]
}

export function CaseStudyContent({ content }: CaseStudyContentProps) {
  if (!content || content.length === 0) return null

  return (
    <section aria-label="Case study content" style={{ paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {content.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  )
}
