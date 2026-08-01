import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  admin: {
    group: 'Site Content',
    description: 'The first thing visitors see — keep it minimal and impactful.',
  },
  fields: [
    {
      name: 'greeting',
      type: 'text',
      defaultValue: "Hi, I'm",
      label: 'Greeting Line',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'SYPH4',
      label: 'Name / Handle',
    },
    {
      name: 'roles',
      type: 'array',
      label: 'Roles (cycling text)',
      admin: {
        description: 'These cycle automatically in the hero. Add 2-4 roles.',
      },
      defaultValue: [
        { role: 'Video Editor' },
        { role: 'Motion Designer' },
        { role: 'Retention Engineer' },
      ],
      fields: [
        { name: 'role', type: 'text', required: true, label: 'Role Title' },
      ],
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      defaultValue: "Helping creators produce videos people can't stop watching.",
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait Photo',
    },
    {
      name: 'ctaPrimary',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'View Work' },
        { name: 'href',  type: 'text', defaultValue: '#work' },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Book a Call' },
        { name: 'href',  type: 'text', defaultValue: '#contact' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats Row',
      admin: {
        description: 'Small statistics shown below the buttons.',
      },
      defaultValue: [
        { value: '2.5', label: 'Years' },
        { value: '250+', label: 'Projects' },
        { value: '50M+', label: 'Views' },
      ],
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
  ],
}
