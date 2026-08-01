import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'project', 'order'],
    group: 'Content',
    description: 'Client testimonials shown on the homepage.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company / Channel',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role / Title',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Client Photo',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
      admin: {
        description: 'The full testimonial. Make it impactful.',
      },
    },
    {
      name: 'project',
      type: 'text',
      label: 'Project Name',
    },
    {
      name: 'result',
      type: 'text',
      label: 'Key Result',
      admin: {
        description: 'A single measurable outcome, e.g. "2.4M views in 48 hours"',
      },
    },
    {
      name: 'videoYoutubeId',
      type: 'text',
      label: 'Video Testimonial YouTube ID (optional)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
