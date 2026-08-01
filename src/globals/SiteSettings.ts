import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site Content',
    description: 'Global site name, SEO defaults, navigation, and footer.',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'SYPH4',
      label: 'Site Name',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Video Editor & Motion Designer',
      label: 'Site Tagline',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'SYPH4 — Video Editor & Motion Designer',
          label: 'Default Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Premium video editing and motion design. Helping creators produce videos people cannot stop watching.',
          label: 'Default Meta Description',
          admin: { description: 'Keep under 160 characters.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Default OG Image',
          admin: { description: 'Used when pages are shared on social media. 1200×630px recommended.' },
        },
        {
          name: 'twitterHandle',
          type: 'text',
          label: 'Twitter / X Handle',
          admin: { description: 'Without the @, e.g. syph4' },
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href',  type: 'text', required: true },
      ],
      defaultValue: [
        { label: 'Work',         href: '#work' },
        { label: 'About',        href: '#about' },
        { label: 'Services',     href: '#services' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact',      href: '#contact' },
      ],
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Footer Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href',  type: 'text', required: true },
      ],
    },
    {
      name: 'footerNote',
      type: 'text',
      label: 'Footer Copyright Note',
      defaultValue: '© 2026 SYPH4. All rights reserved.',
    },
  ],
}
