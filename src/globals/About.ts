import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Section',
  admin: {
    group: 'Site Content',
    description: 'Short editorial paragraphs about your craft and philosophy.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'About',
      label: 'Section Heading',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Paragraphs',
      maxRows: 3,
      admin: {
        description: 'Max 3 paragraphs. Focus on editing philosophy, not biography.',
      },
      defaultValue: [
        {
          text: "I believe every second of video either earns the viewer's attention or loses it. My job is to make sure it always earns it.",
        },
        {
          text: "I approach editing the way a director approaches a scene — with intention. Every cut, every beat, every pause is a deliberate decision made in service of the story.",
        },
        {
          text: "The best edit is invisible. The viewer feels everything and notices nothing.",
        },
      ],
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Paragraph Text',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'About Image (optional)',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
