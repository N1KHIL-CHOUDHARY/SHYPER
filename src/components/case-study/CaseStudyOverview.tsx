import { Tag } from '@/components/ui/Tag'

interface OverviewData {
  client?: string | null
  industry?: string | null
  goal?: string | null
  role?: string | null
  timeline?: string | null
  duration?: string | null
  software?: Array<{ name: string }> | null
  teamMembers?: Array<{ name: string; role: string }> | null
}

interface CaseStudyOverviewProps {
  overview: OverviewData
  results?: Array<{ metric: string; value: string }> | null
}

export function CaseStudyOverview({ overview, results }: CaseStudyOverviewProps) {
  const rows: [string, React.ReactNode][] = [
    ['Client',   overview.client],
    ['Industry', overview.industry],
    ['Role',     overview.role],
    ['Timeline', overview.timeline],
    ['Duration', overview.duration],
  ].filter(([, v]) => !!v) as [string, string][]

  return (
    <section aria-label="Project overview" style={{ paddingTop: 96, paddingBottom: 64 }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="overview-grid"
        >
          {/* Meta table */}
          <div>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#FAFAFA',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 32,
                fontFamily: 'var(--font-geist-mono)',
                fontStyle: 'italic',
              }}
            >
              Overview
            </h2>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 16,
                    paddingBottom: 16,
                    borderBottom: '1px solid #2A2A2A',
                  }}
                >
                  <dt
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontStyle: 'italic',
                      fontSize: 10,
                      color: '#808080',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      paddingTop: 2,
                    }}
                  >
                    {label}
                  </dt>
                  <dd style={{ fontSize: 14, color: '#C2C2C2' }}>{value as string}</dd>
                </div>
              ))}

              {/* Software */}
              {overview.software && overview.software.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 16,
                    paddingBottom: 16,
                    borderBottom: '1px solid #2A2A2A',
                  }}
                >
                  <dt
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontStyle: 'italic',
                      fontSize: 10,
                      color: '#808080',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      paddingTop: 2,
                    }}
                  >
                    Software
                  </dt>
                  <dd style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {overview.software.map((s) => (
                      <Tag key={s.name}>{s.name}</Tag>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Goal + Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {overview.goal && (
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontStyle: 'italic',
                    fontSize: 10,
                    color: '#808080',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  Goal
                </div>
                <p style={{ fontSize: 18, color: '#FAFAFA', lineHeight: 1.6, fontWeight: 400, letterSpacing: '-0.01em' }}>
                  {overview.goal}
                </p>
              </div>
            )}

            {/* Results */}
            {results && results.length > 0 && (
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontStyle: 'italic',
                    fontSize: 10,
                    color: '#808080',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 24,
                  }}
                >
                  Results
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 24 }}>
                  {results.map((r) => (
                    <div key={r.metric} style={{ borderLeft: '1px solid #2A2A2A', paddingLeft: 16 }}>
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: '#FAFAFA',
                          letterSpacing: '-0.04em',
                          lineHeight: 1,
                          marginBottom: 8,
                        }}
                      >
                        {r.value}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-geist-mono)',
                          fontStyle: 'italic',
                          fontSize: 10,
                          color: '#808080',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {r.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .overview-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
