import { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Quote', plural: 'Quotes' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Quote Text',
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Attribution (optional)',
    },
  ],
}
