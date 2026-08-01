import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      label: 'YouTube Video ID',
      admin: {
        description: 'The part after "v=" in the YouTube URL. Example: for youtube.com/watch?v=dQw4w9WgXcQ, enter dQw4w9WgXcQ',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
    },
  ],
}
