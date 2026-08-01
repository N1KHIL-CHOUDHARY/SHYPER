import { Block } from 'payload'

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: { singular: 'Before / After', plural: 'Before / After' },
  fields: [
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Before Image',
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'After Image',
    },
    {
      name: 'beforeLabel',
      type: 'text',
      defaultValue: 'Before',
    },
    {
      name: 'afterLabel',
      type: 'text',
      defaultValue: 'After',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
    },
  ],
}
