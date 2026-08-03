import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  admin: {
    group: 'Site Content',
    description: 'The first thing visitors see - keep it minimal and impactful.',
  },
  fields: [
    {
      name: 'greeting',
      type: 'text',
      defaultValue: '',
      label: 'Greeting Line',
      admin: { description: 'Leave blank to hide.' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'SYPH4',
      label: 'Name / Handle',
    },
    {
      name: 'icpLine',
      type: 'text',
      label: 'ICP Line',
      defaultValue: 'I edit for YouTube creators, brands and music artists.',
      admin: {
        description: 'One line describing WHO you work with. Shown below the name.',
      },
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
      defaultValue: 'Videos people cannot stop watching, cuts that convert viewers into fans.',
    },
    {
      name: 'availableForWork',
      type: 'checkbox',
      label: 'Show Available dot',
      defaultValue: true,
      admin: {
        description: 'Shows a pulsing green dot. Disable when fully booked.',
      },
    },
    {
      name: 'reelYoutubeId',
      type: 'text',
      label: 'Showreel YouTube ID',
      admin: {
        description: 'YouTube video ID e.g. dQw4w9WgXcQ. Leave blank to hide.',
      },
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
        { name: 'label', type: 'text', defaultValue: 'Watch My Reel' },
        { name: 'href',  type: 'text', defaultValue: '#reel' },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Start a Project' },
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