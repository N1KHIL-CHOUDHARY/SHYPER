import { SectionLabel } from '@/components/ui/SectionLabel'

interface AboutData {
  heading?: string | null
  paragraphs?: Array<{ text: string }> | null
  stats?: Array<{ value: string; label: string }> | null
}

export function About({ data }: { data: AboutData }) {
  const paragraphs = data.paragraphs ?? []
  const stats = data.stats ?? []

  return (
    <section id="about" className="section" aria-label="About">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <SectionLabel>About</SectionLabel>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 600,
              color: '#FAFAFA',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            {data.heading ?? 'About'}
          </h2>

          {/* Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 16,
                    color: '#C2C2C2',
                    lineHeight: 1.75,
                  }}
                >
                  {p.text}
                </p>
              ))
            ) : (
              <p style={{ color: '#808080', fontStyle: 'italic' }}>
                Add your about content in the CMS.
              </p>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: 48,
                  flexWrap: 'wrap',
                  marginTop: 24,
                  paddingTop: 32,
                  borderTop: '1px solid #2A2A2A',
                }}
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 600,
                        color: '#FAFAFA',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-geist-mono)',
                        fontStyle: 'italic',
                        fontSize: 10,
                        color: '#808080',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: 6,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
