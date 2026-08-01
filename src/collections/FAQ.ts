import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order'],
    group: 'Content',
    description: 'Frequently asked questions shown as an accordion.',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Answer',
      admin: {
        description: 'Clear, honest answer. Visitors read this carefully.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
