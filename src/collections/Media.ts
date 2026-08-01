import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Content',
    description: 'Upload and manage all images and media files used across the portfolio.',
  },
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card',      width: 800, height: 600, position: 'centre' },
      { name: 'hero',      width: 1600, height: 900, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe this image for screen readers and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Profile', value: 'profile' },
        { label: 'Project Thumbnail', value: 'project-thumbnail' },
        { label: 'Case Study', value: 'case-study' },
        { label: 'Client Logo', value: 'client-logo' },
        { label: 'Testimonial', value: 'testimonial' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        { name: 'tag', type: 'text', label: 'Tag' },
      ],
    },
  ],
}
