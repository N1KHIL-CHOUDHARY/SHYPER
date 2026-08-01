'use client'

import { useActionState } from 'react'
import { Mail, MessageSquare, Calendar, Link2 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { sendContactEmail, type ContactFormState } from '@/lib/send-email'


const SOCIAL_ICON = Link2

interface ContactData {
  heading?: string | null
  subtext?: string | null
  email?: string | null
  whatsapp?: string | null
  calendly?: string | null
  socials?: Array<{ platform: string; url: string; label?: string | null }> | null
}

const initialState: ContactFormState = { success: false }

function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, initialState)

  if (state.success) {
    return (
      <div
        style={{
          padding: '40px',
          border: '1px solid #2A2A2A',
          background: '#111111',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 22, color: '#5EEA7A', fontWeight: 600 }}>✓ Sent.</div>
        <p style={{ color: '#C2C2C2', fontSize: 15 }}>
          Your message has been delivered. I'll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Honeypot */}
      <input type="text" name="_hp" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

      {[
        { id: 'name',    label: 'Name',    type: 'text',  required: true,  autoComplete: 'name'  },
        { id: 'email',   label: 'Email',   type: 'email', required: true,  autoComplete: 'email' },
      ].map((field) => (
        <div
          key={field.id}
          style={{ borderBottom: '1px solid #2A2A2A', position: 'relative' }}
        >
          <label
            htmlFor={field.id}
            style={{
              display: 'block',
              fontFamily: 'var(--font-geist-mono)',
              fontStyle: 'italic',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#808080',
              paddingTop: 20,
              paddingLeft: 0,
            }}
          >
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required={field.required}
            autoComplete={field.autoComplete}
            style={{
              display: 'block',
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 16,
              color: '#FAFAFA',
              padding: '8px 0 20px 0',
              fontFamily: 'var(--font-geist-sans)',
            }}
            placeholder=" "
          />
        </div>
      ))}

      {/* Message */}
      <div style={{ borderBottom: '1px solid #2A2A2A' }}>
        <label
          htmlFor="message"
          style={{
            display: 'block',
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#808080',
            paddingTop: 20,
          }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          style={{
            display: 'block',
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 16,
            color: '#FAFAFA',
            padding: '8px 0 20px 0',
            fontFamily: 'var(--font-geist-sans)',
            lineHeight: 1.65,
          }}
          placeholder=" "
        />
      </div>

      {/* Error */}
      {state.error && (
        <p
          style={{
            color: '#EAB308',
            fontSize: 13,
            marginTop: 16,
            fontFamily: 'var(--font-geist-mono)',
            fontStyle: 'italic',
          }}
          role="alert"
        >
          {state.error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary"
        style={{
          marginTop: 32,
          alignSelf: 'flex-start',
          opacity: pending ? 0.6 : 1,
          transition: 'opacity 200ms ease',
        }}
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export function Contact({ data }: { data: ContactData }) {
  const socials = data.socials ?? []

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <SectionLabel>Contact</SectionLabel>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 96,
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 600,
                color: '#FAFAFA',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 24,
                marginTop: 8,
              }}
            >
              {data.heading ?? "Let's build something worth watching."}
            </h2>

            {data.subtext && (
              <p style={{ color: '#808080', fontSize: 15, lineHeight: 1.75, marginBottom: 48 }}>
                {data.subtext}
              </p>
            )}

            {/* Direct contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C2C2C2', transition: 'color 200ms ease', fontSize: 14 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#C2C2C2')}
                >
                  <Mail size={16} color="#808080" aria-hidden="true" />
                  {data.email}
                </a>
              )}
              {data.whatsapp && (
                <a
                  href={data.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C2C2C2', transition: 'color 200ms ease', fontSize: 14 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#C2C2C2')}
                >
                  <MessageSquare size={16} color="#808080" aria-hidden="true" />
                  WhatsApp
                </a>
              )}
              {data.calendly && (
                <a
                  href={data.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C2C2C2', transition: 'color 200ms ease', fontSize: 14 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#C2C2C2')}
                >
                  <Calendar size={16} color="#808080" aria-hidden="true" />
                  Book a Call — Calendly
                </a>
              )}
            </div>

            {/* Socials */}
            {socials.length > 0 && (
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {socials.map((s) => {
                  const Icon = SOCIAL_ICON
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label ?? s.platform}
                      style={{
                        color: '#808080',
                        transition: 'color 200ms ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 13,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAFA')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {s.label ?? s.platform}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
