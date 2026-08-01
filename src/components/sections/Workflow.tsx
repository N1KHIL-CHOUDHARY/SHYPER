'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface WorkflowStep {
  title: string
  description: string
}

interface WorkflowData {
  heading?: string | null
  steps?: WorkflowStep[] | null
}

export function Workflow({ data }: { data: WorkflowData }) {
  const reducedMotion = useReducedMotion()
  const steps = data.steps ?? []
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reducedMotion || steps.length === 0) return

    const observers = steps.map((_, i) => {
      const el = stepRefs.current[i]
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      )
      obs.observe(el)
      return obs
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [steps.length, reducedMotion])

  if (steps.length === 0) return null

  return (
    <section id="workflow" className="section" aria-label="My Process">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <SectionLabel>Process</SectionLabel>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 600,
            color: '#FAFAFA',
            letterSpacing: '-0.03em',
            marginBottom: 80,
            marginTop: 8,
          }}
        >
          {data.heading ?? 'My Process'}
        </h2>

        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="workflow-container"
        >
          {/* Sticky sidebar — step list */}
          <div
            style={{
              position: 'sticky',
              top: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
            className="workflow-sidebar"
            aria-hidden="true"
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`workflow-step ${reducedMotion || i === activeStep ? 'active' : i < activeStep ? 'active' : 'inactive'}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 0',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `1px solid ${i === activeStep ? '#FAFAFA' : '#2A2A2A'}`,
                    background: i === activeStep ? '#FAFAFA' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontFamily: 'var(--font-geist-mono)',
                    color: i === activeStep ? '#0B0B0B' : '#808080',
                    flexShrink: 0,
                    transition: 'all 300ms ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: i === activeStep ? 500 : 400,
                    color: i === activeStep ? '#FAFAFA' : '#808080',
                    transition: 'color 300ms ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Scrolling steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => { stepRefs.current[i] = el }}
                style={{
                  transition: reducedMotion ? 'none' : 'opacity 400ms ease',
                  opacity: reducedMotion ? 1 : i === activeStep ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontStyle: 'italic',
                    fontSize: 11,
                    color: '#808080',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    fontWeight: 600,
                    color: '#FAFAFA',
                    letterSpacing: '-0.02em',
                    marginBottom: 20,
                    lineHeight: 1.15,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: '#C2C2C2',
                    lineHeight: 1.75,
                    maxWidth: 560,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .workflow-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .workflow-sidebar {
            position: static !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  )
}
