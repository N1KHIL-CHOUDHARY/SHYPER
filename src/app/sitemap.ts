import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const payload = await getPayloadClient()
    const result  = await payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      limit: 200,
      depth: 0,
    })

    const projectRoutes: MetadataRoute.Sitemap = result.docs.map((p: any) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    return [...staticRoutes, ...projectRoutes]
  } catch {
    return staticRoutes
  }
}
