import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Section',
  admin: {
    group: 'Site Content',
    description: 'Contact details, social links, and the heading shown on the contact form section.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: "Let's build something worth watching.",
      label: 'Section Heading',
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue: "Whether you have a project in mind or just want to talk about ideas — I'd love to hear from you.",
      label: 'Supporting Text',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'WhatsApp Link',
      admin: { description: 'Full URL, e.g. https://wa.me/1234567890' },
    },
    {
      name: 'calendly',
      type: 'text',
      label: 'Calendly Link',
      admin: { description: 'Your Calendly booking URL.' },
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Discord', value: 'discord' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'GitHub', value: 'github' },
          ],
        },
        { name: 'url',   type: 'text', required: true, label: 'Profile URL' },
        { name: 'label', type: 'text', label: 'Display Label (optional)' },
      ],
    },
  ],
}
