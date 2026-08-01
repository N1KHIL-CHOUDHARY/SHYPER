import { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  labels: { singular: 'Spacer', plural: 'Spacers' },
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small (32px)', value: 'small' },
        { label: 'Medium (64px)', value: 'medium' },
        { label: 'Large (128px)', value: 'large' },
      ],
    },
  ],
}
