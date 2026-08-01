'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

function FAQAccordionItem({ item, isOpen, onToggle }: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  const reducedMotion = useReducedMotion()
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <div className="faq-item">
      <button
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
        id={`faq-btn-${item.id}`}
      >
        <span
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 500,
            color: isOpen ? '#FAFAFA' : '#C2C2C2',
            transition: 'color 200ms ease',
            textAlign: 'left',
            flex: 1,
          }}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={transition}
          style={{ flexShrink: 0, color: '#808080', display: 'flex' }}
        >
          <Plus size={18} aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-${item.id}`}
            role="region"
            aria-labelledby={`faq-btn-${item.id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="faq-content"
          >
            <p
              style={{
                padding: '0 0 28px 0',
                color: '#C2C2C2',
                fontSize: 15,
                lineHeight: 1.75,
                maxWidth: 680,
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (items.length === 0) return null

  return (
    <section id="faq" className="section" aria-label="Frequently Asked Questions">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="faq-grid"
        >
          {/* Heading */}
          <div style={{ position: 'sticky', top: 100 }}>
            <SectionLabel>FAQ</SectionLabel>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginTop: 8,
              }}
            >
              Common Questions
            </h2>
          </div>

          {/* Items */}
          <div>
            {items.map((item) => (
              <FAQAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .faq-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  )
}
