import { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
      ],
    },
  ],
}
