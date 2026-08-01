import type { CollectionConfig } from 'payload'
import {
  ParagraphBlock,
  HeadingBlock,
  ImageBlock,
  GalleryBlock,
  QuoteBlock,
  CalloutBlock,
  StatisticsBlock,
  BeforeAfterBlock,
  VideoBlock,
  SpacerBlock,
} from '@/blocks'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured', '_status'],
    group: 'Content',
    description: 'Manage your portfolio projects and case studies.',
    listSearchableFields: ['title', 'category', 'client'],
  },
  versions: {
    drafts: { autosave: { interval: 375 } },
    maxPerDoc: 10,
  },
  fields: [
    // ─── Core Identity ──────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Used in the URL: /projects/your-slug. Use lowercase with hyphens.',
      },
    },
    {
      name: 'index',
      type: 'text',
      label: 'Index Number',
      admin: {
        description: 'Display number, e.g. "01", "02"',
        width: '20%',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'YouTube', value: 'YouTube' },
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Educational', value: 'Educational' },
        { label: 'Gaming', value: 'Gaming' },
        { label: 'Documentary', value: 'Documentary' },
        { label: 'Motion Graphics', value: 'Motion Graphics' },
        { label: 'Brand Film', value: 'Brand Film' },
        { label: 'Short Film', value: 'Short Film' },
      ],
    },
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      admin: { width: '20%' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured on Homepage',
          defaultValue: true,
          admin: { width: '50%' },
        },
        {
          name: 'showOnHomepage',
          type: 'checkbox',
          label: 'Visible in Work Section',
          defaultValue: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first. Drag to reorder in the list view.',
      },
    },
    // ─── Media ──────────────────────────────────────────
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
      admin: { description: 'Used in the project archive list.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover / Hero Image',
      admin: { description: 'Full-width image at the top of the case study page.' },
    },
    {
      name: 'clientLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Client Logo',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'youtubeId',
      type: 'text',
      label: 'YouTube Video ID',
      admin: {
        description: 'The ID from the YouTube URL. e.g. for ?v=abc123, enter abc123',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      label: 'External Project Link (optional)',
      admin: { description: 'Link to the published video, client site, etc.' },
    },
    // ─── Project Meta ────────────────────────────────────
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
      admin: { description: 'Shown in the expanded row in the Work archive.' },
    },
    {
      name: 'accentColor',
      type: 'text',
      label: 'Project Accent Color (optional)',
      admin: { description: 'Hex color used for this project, e.g. #FF5500' },
    },
    // ─── Case Study Tabs ─────────────────────────────────
    {
      name: 'overview',
      type: 'group',
      label: 'Overview',
      admin: { description: 'High-level project details' },
      fields: [
        { name: 'client',   type: 'text', label: 'Client Name' },
        { name: 'industry', type: 'text', label: 'Industry' },
        { name: 'goal',     type: 'textarea', label: 'Goal' },
        { name: 'role',     type: 'text', label: 'Your Role' },
        { name: 'timeline', type: 'text', label: 'Timeline' },
        { name: 'duration', type: 'text', label: 'Project Duration' },
        {
          name: 'software',
          type: 'array',
          label: 'Software Used',
          fields: [{ name: 'name', type: 'text', required: true }],
        },
        {
          name: 'teamMembers',
          type: 'array',
          label: 'Team Members (optional)',
          fields: [
            { name: 'name', type: 'text', label: 'Name' },
            { name: 'role', type: 'text', label: 'Role' },
          ],
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      label: 'Results / Metrics',
      admin: { description: 'Key performance metrics to show in the archive and case study.' },
      fields: [
        { name: 'metric', type: 'text', required: true, label: 'Metric Name (e.g. "Total Views")' },
        { name: 'value',  type: 'text', required: true, label: 'Value (e.g. "4.2M")' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [{ name: 'tag', type: 'text' }],
    },
    // ─── Flexible Case Study Content ─────────────────────
    {
      name: 'content',
      type: 'blocks',
      label: 'Case Study Content',
      admin: {
        description: 'Build the case study using content blocks. Add paragraphs, images, quotes, statistics, before/after comparisons, and more.',
      },
      blocks: [
        ParagraphBlock,
        HeadingBlock,
        ImageBlock,
        GalleryBlock,
        QuoteBlock,
        CalloutBlock,
        StatisticsBlock,
        BeforeAfterBlock,
        VideoBlock,
        SpacerBlock,
      ],
    },
    // ─── Related ─────────────────────────────────────────
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Related Projects',
      maxDepth: 1,
    },
    // ─── SEO ─────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Page Title',
          admin: { description: 'Defaults to project title if empty.' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: { description: 'Keep under 160 characters.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
          admin: { description: 'Shown when shared on social media. Recommended: 1200×630px.' },
        },
      ],
    },
  ],
}
