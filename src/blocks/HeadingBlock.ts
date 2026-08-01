import { Block } from 'payload'

export const HeadingBlock: Block = {
  slug: 'heading',
  labels: { singular: 'Heading', plural: 'Headings' },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Heading Text',
    },
    {
      name: 'level',
      type: 'select',
      defaultValue: 'h2',
      options: [
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
      ],
    },
  ],
}
