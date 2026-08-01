import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'size', 'order'],
    group: 'Content',
    description: 'Services offered — displayed in the editorial bento grid.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Name',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
      admin: {
        description: 'One to two sentences describing what this service includes.',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Lucide Icon Name',
      admin: {
        description: 'Name of a Lucide icon, e.g. "Film", "Wand2", "Monitor". Browse at lucide.dev.',
      },
    },
    {
      name: 'size',
      type: 'select',
      label: 'Card Size',
      defaultValue: 'medium',
      options: [
        { label: 'Large (spans 2 columns)', value: 'large' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
