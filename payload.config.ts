import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Projects } from './src/collections/Projects'
import { Testimonials } from './src/collections/Testimonials'
import { Services } from './src/collections/Services'
import { FAQ } from './src/collections/FAQ'

import { Hero } from './src/globals/Hero'
import { About } from './src/globals/About'
import { Workflow } from './src/globals/Workflow'
import { Contact } from './src/globals/Contact'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isPostgresUrl = process.env.DATABASE_URL?.startsWith('postgres') || process.env.DATABASE_URL?.startsWith('postgresql')
const usePostgres = process.env.DATABASE_DRIVER === 'postgres' || isPostgresUrl

const db = usePostgres
  ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URL!,
      },
    })
  : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URL?.startsWith('file:')
          ? process.env.DATABASE_URL
          : 'file:./payload.db',
      },
      push: true,
    })

export default buildConfig({
  serverURL: process.env.NODE_ENV === 'development' ? '' : (process.env.NEXT_PUBLIC_SERVER_URL || ''),
  secret: process.env.PAYLOAD_SECRET ?? 'your-secret-key',

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— SYPH4 Admin',
    },
    components: {
      beforeDashboard: ['@/payload/components/BeforeDashboard#BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  db,

  editor: lexicalEditor(),

  collections: [Users, Media, Projects, Testimonials, Services, FAQ],

  globals: [Hero, About, Workflow, Contact, SiteSettings],

  typescript: {
    outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
    disable: true,
  },

  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
})