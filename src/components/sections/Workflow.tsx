'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface WorkflowStep {
  title: string
  description: string
}

interface WorkflowData {
  heading?: string | null
  steps?: WorkflowStep[] | null
}

export function Workflow({ data }: { data: WorkflowData }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const steps = data.steps ?? []

  if (steps.length === 0) return null

  return (
    <section id="workflow" className="relative h-[300vh]" ref={containerRef} aria-label="My Process">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-24 bg-black">
        <div className="container mb-20 shrink-0">
          <SectionLabel>Process</SectionLabel>
          <h2 className="text-[clamp(28px,4vw,48px)] font-semibold text-neutral-50 tracking-tight leading-tight mt-2">
            {data.heading ?? 'My Process'}
          </h2>
        </div>

        <motion.div
          style={{ x }}
          className="flex items-start gap-16 md:gap-24 px-4 md:px-8 xl:px-[10vw] w-max"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-[260px] md:w-[340px] shrink-0 flex flex-col"
            >
              <span
                className="font-mono text-7xl md:text-9xl font-bold leading-none mb-10 text-transparent"
                style={{ WebkitTextStroke: '1px rgb(64 64 64)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* connector node + line segment */}
              <div className="relative h-px w-full bg-neutral-800 mb-8">
                <span className="absolute -top-[3px] left-0 w-[7px] h-[7px] rounded-full bg-neutral-600" />
                {index === 0 && (
                  <motion.div
                    style={{ scaleX: lineScale }}
                    className="absolute inset-0 bg-neutral-50 origin-left"
                  />
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-neutral-50 mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm md:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
