import { Block } from 'payload'

export const StatisticsBlock: Block = {
  slug: 'statistics',
  labels: { singular: 'Statistics', plural: 'Statistics' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      label: 'Stats',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value (e.g. "50M+")',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (e.g. "Total Views")',
        },
      ],
    },
  ],
}
