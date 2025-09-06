import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Enhanced Sanity client with better error handling
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-08-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
  stega: false,
  // Disable credentials to prevent CORS issues
  withCredentials: false,
})

// Image URL builder
const builder = imageUrlBuilder(client)

// urlForImage function for Sanity images
export function urlForImage(source: any) {
  if (!source) return builder.image('')
  return builder.image(source)
}

// Simple image URL function
export function getImageUrl(image: any) {
  if (!image) return ''
  
  // If it's already a string URL, return it
  if (typeof image === 'string') return image
  
  // If it has a direct URL property
  if (image.url) return image.url
  
  // If it has an asset reference (Sanity image)
  if (image.asset && image.asset._ref) {
    try {
      // Use Sanity's image URL builder with responsive parameters
      const url = builder.image(image).width(1200).fit('clip').url()
      return url
    } catch (error) {
      console.warn('Error generating image URL:', error)
      return ''
    }
  }
  
  return ''
}

// Simple video URL function
export function getVideoUrl(video: any): string {
  if (!video?.asset?._ref) return ''
  
  const fileId = video.asset._ref.replace('file-', '')
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  if (!projectId) return ''
  
  // Remove the extension suffix from fileId if it exists (e.g., "abc123-mp4" -> "abc123")
  // Then add the proper extension
  const cleanFileId = fileId.replace(/-\w+$/, '')
  const extension = video.asset.extension || 'mp4'
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${cleanFileId}.${extension}`
}

// Simple test function
export async function testSanityConnection() {
  try {
    const result = await client.fetch('*[_type == "post" || _type == "project"] | order(_createdAt desc)[0...1]')
    console.log('Sanity connection test successful:', result)
    return true
  } catch (error) {
    console.error('Sanity connection test failed:', error)
    return false
  }
}

// Force refresh Sanity data
export async function refreshSanityData() {
  try {
    // Clear any cached data by making a fresh request
    const result = await client.fetch('*[_type == "project"] | order(_updatedAt desc)', {}, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    console.log('Sanity data refreshed:', result)
    return result
  } catch (error) {
    console.error('Failed to refresh Sanity data:', error)
    return null
  }
}

// Helper function to safely fetch data with fallback
export async function safeFetch(query: string, fallbackData: any = null, params?: any) {
  try {
    const result = await client.fetch(query, params)
    return result || fallbackData
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return fallbackData
  }
}
