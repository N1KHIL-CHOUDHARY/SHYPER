import { SectionLabel } from '@/components/ui/SectionLabel'
import {
  Film, Wand2, Monitor, Gamepad2, GraduationCap,
  VideoIcon, Palette, Volume2, LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Film, Wand2, Monitor, Gamepad2, GraduationCap,
  Video: VideoIcon, Palette, Volume2,
}

interface ServiceData {
  id: string
  title: string
  description?: string | null
  icon?: string | null
  size?: 'large' | 'medium' | 'small' | null
  order?: number | null
}

interface ServicesProps {
  services: ServiceData[]
}

function ServiceCard({ service }: { service: ServiceData }) {
  const Icon = service.icon ? ICON_MAP[service.icon] ?? Film : Film
  const isLarge = service.size === 'large'

  return (
    <div
      className={`bento-card ${isLarge ? 'large' : ''}`}
      style={{ gridColumn: isLarge ? 'span 2' : 'span 1' }}
    >
      <Icon
        size={isLarge ? 28 : 22}
        color="#808080"
        style={{ marginBottom: 24 }}
        aria-hidden="true"
      />
      <h3
        style={{
          fontSize: isLarge ? 22 : 16,
          fontWeight: 600,
          color: '#FAFAFA',
          letterSpacing: '-0.02em',
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>
      {service.description && (
        <p style={{ fontSize: 13, color: '#808080', lineHeight: 1.65 }}>
          {service.description}
        </p>
      )}
    </div>
  )
}

export function Services({ services }: ServicesProps) {
  if (services.length === 0) {
    return (
      <section id="services" className="section" aria-label="Services">
        <div className="container">
          <hr className="divider" style={{ marginBottom: 80 }} />
          <SectionLabel>Services</SectionLabel>
          <p style={{ color: '#808080', fontStyle: 'italic', marginTop: 24 }}>
            Add your services in the CMS.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="section" aria-label="Services">
      <div className="container">
        <hr className="divider" style={{ marginBottom: 80 }} />
        <SectionLabel>Services</SectionLabel>
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
          What I Do
        </h2>

        <div className="bento-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
