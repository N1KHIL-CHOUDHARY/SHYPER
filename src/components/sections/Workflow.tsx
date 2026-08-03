'use client';

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()
  const steps = data.steps ?? []

  const { scrollYProgress } = useScroll({
    target: containerNode ? { current: containerNode } : undefined,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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
            marginBottom: 64,
            marginTop: 8,
          }}
        >
          {data.heading ?? 'My Process'}
        </h2>

        <div ref={(node) => setContainerNode(node)} style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 19,
              top: 8,
              bottom: 8,
              width: 1,
              background: '#2A2A2A',
            }}
            aria-hidden="true"
          />
          <motion.div
            style={{
              position: 'absolute',
              left: 19,
              top: 8,
              width: 1,
              height: reducedMotion ? '100%' : lineHeight,
              background: '#FAFAFA',
              transformOrigin: 'top',
            }}
            aria-hidden="true"
          />

          <div>
            {steps.map((step, index) => (
              <Step key={index} index={index} step={step} isLast={index === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ step, index, isLast }: { step: WorkflowStep; index: number; isLast: boolean }) {
  return (
    <div
      className="workflow-step"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '40px 1fr',
        gap: 32,
        paddingBottom: isLast ? 0 : 56,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #2A2A2A',
          background: '#0B0B0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 12,
          color: '#808080',
          flexShrink: 0,
          zIndex: 1,
          transition: 'border-color 250ms ease, color 250ms ease',
        }}
        className="workflow-node"
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ paddingTop: 6, transition: 'transform 250ms ease' }} className="workflow-content">
        <h3
          style={{
            fontSize: 'clamp(18px, 2vw, 22px)',
            fontWeight: 600,
            color: '#FAFAFA',
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: '#808080',
            lineHeight: 1.7,
            maxWidth: 560,
          }}
        >
          {step.description}
        </p>
      </div>

      <style>{`
        .workflow-step:hover .workflow-node {
          border-color: #FAFAFA;
          color: #FAFAFA;
        }
        .workflow-step:hover .workflow-content {
          transform: translateX(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          .workflow-content { transition: none !important; }
        }
      `}</style>
    </div>
  )
}