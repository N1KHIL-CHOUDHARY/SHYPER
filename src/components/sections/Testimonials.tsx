import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { VideoCard } from '@/components/ui/VideoCard'
import { getMediaUrl } from '@/lib/utils'

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

function TestimonialItem({ t }: { t: TestimonialData }) {
  const photoUrl = t.photo?.url ? getMediaUrl(t.photo.url) : null

  return (
    <article className="testimonial" aria-label={`Testimonial from ${t.name}`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: t.videoYoutubeId ? '1fr 480px' : '1fr',
          gap: 80,
          alignItems: 'start',
        }}
        className="testimonial-grid"
      >
        {/* Content */}
        <div>
          {/* Large quote */}
          <blockquote
            style={{
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              color: '#FAFAFA',
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
              fontStyle: 'italic',
              marginBottom: 40,
              quotes: '"\\201C""\\201D"',
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {photoUrl && (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <Image
                  src={photoUrl}
                  alt={t.photo?.alt ?? t.name}
                  fill
                  sizes="44px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#FAFAFA' }}>
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontStyle: 'italic',
                  fontSize: 11,
                  color: '#808080',
                  marginTop: 2,
                  letterSpacing: '0.04em',
                }}
              >
                {[t.role, t.company].filter(Boolean).join(' · ')}
              </div>
            </div>
          </div>

          {/* Meta */}
          {(t.project || t.result) && (
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginTop: 32,
                paddingTop: 24,
                borderTop: '1px solid #2A2A2A',
              }}
            >
              {t.project && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontStyle: 'italic',
                      fontSize: 9,
                      color: '#2A2A2A',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    Project
                  </div>
                  <div style={{ fontSize: 13, color: '#808080' }}>{t.project}</div>
                </div>
              )}
              {t.result && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontStyle: 'italic',
                      fontSize: 9,
                      color: '#2A2A2A',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    Result
                  </div>
                  <div style={{ fontSize: 13, color: '#5EEA7A', fontWeight: 500 }}>
                    {t.result}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Optional video testimonial */}
        {t.videoYoutubeId && (
          <VideoCard youtubeId={t.videoYoutubeId} title={`${t.name}'s testimonial`} />
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </article>
  )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section" aria-label="Testimonials">
        <div className="container">
          <hr className="divider" style={{ marginBottom: 80 }} />
          <SectionLabel>Testimonials</SectionLabel>
          <p style={{ color: '#808080', fontStyle: 'italic', marginTop: 24 }}>
            Add your first testimonial in the CMS.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="section" aria-label="Client Testimonials">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <SectionLabel>Testimonials</SectionLabel>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 600,
            color: '#FAFAFA',
            letterSpacing: '-0.03em',
            marginBottom: 64,
            marginTop: 8,
          }}
        >
          What Clients Say
        </h2>

        <div>
          {testimonials.map((t) => (
            <TestimonialItem key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
