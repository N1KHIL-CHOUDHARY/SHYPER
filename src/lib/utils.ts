import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes cleanly */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a year or date number as a string */
export function formatYear(year: number): string {
  return String(year)
}

/** Truncate a string at word boundary */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

/** Build a Payload media URL, ensuring local URLs are relative for Next.js Image SSRF protection */
export function getMediaUrl(url?: string | null): string {
  if (!url) return ''
  
  // Convert absolute localhost URLs to relative paths
  if (url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
    try {
      return new URL(url).pathname
    } catch {
      return url
    }
  }
  
  // Preserve remote absolute URLs (e.g., S3, Cloudinary)
  if (url.startsWith('http')) return url
  
  // Keep relative URLs relative so Next.js Image component handles them natively
  return url
}

/** Get YouTube thumbnail URL from video ID */
export function getYoutubeThumbnail(
  videoId: string,
  quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault',
): string {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`
}

/** YouTube embed URL */
export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
}

/** Pad a number as an archive index */
export function toIndexString(n: number): string {
  return String(n).padStart(2, '0')
}
