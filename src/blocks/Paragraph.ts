import { Block } from 'payload'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Text',
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' },
        { label: 'Small / Caption', value: 'small' },
      ],
    },
  ],
}
