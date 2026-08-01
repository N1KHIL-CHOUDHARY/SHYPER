import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Returns an initialized Payload instance.
 * Uses Next.js caching — the instance is shared across requests in the same render cycle.
 */
export async function getPayloadClient() {
  return await getPayload({ config: configPromise })
}
