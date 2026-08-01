'use client'

import React from 'react'

// This component renders before the default Payload dashboard widgets.
// It shows a branded welcome panel + quick stats.
export function BeforeDashboard() {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '2rem',
        background: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '8px',
        fontFamily: 'monospace',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: '#58a6ff',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          SYPH4 PORTFOLIO CMS
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f0f6fc', margin: 0 }}>
          Welcome back.
        </h1>
        <p style={{ color: '#8b949e', marginTop: '8px', fontSize: '14px' }}>
          Manage your portfolio content from here. No code required.
        </p>
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #21262d', margin: '1.5rem 0' }} />

      {/* Quick Actions */}
      <div>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: '#8b949e',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Quick Actions
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: '+ New Project',     href: '/admin/collections/projects/create' },
            { label: '+ Upload Media',    href: '/admin/collections/media/create' },
            { label: '+ New Testimonial', href: '/admin/collections/testimonials/create' },
            { label: 'Edit Hero',         href: '/admin/globals/hero' },
            { label: 'Edit Contact',      href: '/admin/globals/contact' },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '6px',
                color: '#c9d1d9',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'border-color 0.15s',
              }}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: '12px',
          background: '#161b22',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#8b949e',
        }}
      >
        💡 <strong style={{ color: '#c9d1d9' }}>Tip:</strong> Changes to Projects use Draft/Publish workflow — save as draft to preview, then publish when ready.
      </div>
    </div>
  )
}
