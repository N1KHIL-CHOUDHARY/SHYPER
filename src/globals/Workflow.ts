import type { GlobalConfig } from 'payload'

export const Workflow: GlobalConfig = {
  slug: 'workflow',
  label: 'Workflow Section',
  admin: {
    group: 'Site Content',
    description: 'The process steps shown as a sticky timeline.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'My Process',
      label: 'Section Heading',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Process Steps',
      admin: {
        description: 'Each step is highlighted as the visitor scrolls.',
      },
      defaultValue: [
        { title: 'Idea', description: 'Understanding the goal, audience, and message. Defining what success looks like before a single clip is touched.' },
        { title: 'Research', description: 'Studying the niche, top-performing content, and the creator\'s existing voice to build a clear editorial strategy.' },
        { title: 'Story', description: 'Writing the narrative arc. Deciding what to include, what to cut, and in what order the story will unfold.' },
        { title: 'Assembly', description: 'Rough assembly of all footage. Laying the foundation — pacing, structure, flow.' },
        { title: 'Editing', description: 'The precision cut. Every frame is intentional. Pacing is tuned. The edit breathes.' },
        { title: 'Motion', description: 'Motion graphics, titles, and visual accents that support the story without distracting from it.' },
        { title: 'Sound', description: 'Music selection, sound design, and mixing. Sound makes or breaks the emotion of a video.' },
        { title: 'Color', description: 'Color grading to set the visual tone. Every project gets its own cinematic look.' },
        { title: 'Delivery', description: 'Export, quality check, and handoff. Files delivered in the exact format needed, on time.' },
      ],
      fields: [
        { name: 'title',       type: 'text',     required: true, label: 'Step Title' },
        { name: 'description', type: 'textarea',  required: true, label: 'Step Description' },
      ],
    },
  ],
}
