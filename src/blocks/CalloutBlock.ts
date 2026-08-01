import { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Tip', value: 'tip' },
        { label: 'Warning', value: 'warning' },
        { label: 'Result', value: 'result' },
      ],
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Callout Text',
    },
  ],
}
