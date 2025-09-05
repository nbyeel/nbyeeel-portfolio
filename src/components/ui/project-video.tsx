'use client'

import { useState, useEffect, useRef } from 'react'

interface ProjectVideoProps {
  src: string
  alt: string
  fallbackLetter: string
  fallbackGradient?: string
  className?: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
}

export function ProjectVideo({ 
  src, 
  alt, 
  fallbackLetter, 
  fallbackGradient = "from-blue-500 via-purple-500 to-indigo-600",
  className = "",
  aspectRatio = 'portrait'
}: ProjectVideoProps) {
  const [videoError, setVideoError] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Generate multiple possible URLs
  const generatePossibleUrls = (baseUrl: string) => {
    if (!baseUrl) return []
    
    const url = new URL(baseUrl)
    const pathParts = url.pathname.split('/')
    const filename = pathParts[pathParts.length - 1]
    const basePath = pathParts.slice(0, -1).join('/')
    
    return [
      baseUrl, // Original URL
      `${url.origin}${basePath}/${filename.replace('.mp4', '')}`, // Without extension
      `${url.origin}${basePath}/${filename.replace('.mp4', '')}.mp4`, // Force MP4
      `${url.origin}${basePath}/${filename.replace('.mp4', '')}.webm`, // Try WebM
    ]
  }

  const possibleUrls = generatePossibleUrls(src)
  const currentUrl = possibleUrls[currentUrlIndex] || src

  const handleVideoError = (event: any) => {
    console.log(`❌ Video error for URL ${currentUrl}:`, event)
    
    // Try next URL if available
    if (currentUrlIndex < possibleUrls.length - 1) {
      console.log(`🔄 Trying next URL: ${possibleUrls[currentUrlIndex + 1]}`)
      setCurrentUrlIndex(currentUrlIndex + 1)
      setVideoError(false)
      setVideoLoading(true)
    } else {
      console.log('❌ All video URLs failed')
      setVideoError(true)
      setVideoLoading(false)
    }
  }

  const handleVideoLoad = (event: any) => {
    console.log(`✅ Video loaded successfully from: ${currentUrl}`)
    setVideoError(false)
    setVideoLoading(false)
  }

  // Reset when src changes
  useEffect(() => {
    setCurrentUrlIndex(0)
    setVideoError(false)
    setVideoLoading(true)
  }, [src])

  // Show placeholder if no valid src or all URLs failed
  const isValidSrc = src && typeof src === 'string' && src !== '' && src !== 'http://localhost:3000/' && !src.includes('localhost:3000')
  const showPlaceholder = !isValidSrc || (videoError && currentUrlIndex >= possibleUrls.length - 1)
  
  console.log('🎥 ProjectVideo state:', { 
    src, 
    currentUrl, 
    currentUrlIndex, 
    possibleUrls: possibleUrls.length,
    isValidSrc, 
    showPlaceholder, 
    videoError, 
    videoLoading 
  })

  // Get aspect ratio class based on prop
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'portrait': return 'aspect-[9/16]'
      case 'landscape': return 'aspect-video'
      case 'square': return 'aspect-square'
      default: return 'aspect-[9/16]'
    }
  }

  return (
    <div className={`relative ${getAspectRatioClass()} ${className}`}>
      {showPlaceholder && (
        <div className={`bg-gradient-to-br ${fallbackGradient} flex items-center justify-center absolute inset-0 z-10`}>
          <div className="text-6xl font-bold text-white opacity-30">
            {fallbackLetter}
          </div>
          {videoError && (
            <div className="absolute bottom-4 left-4 text-sm text-white opacity-70">
              Video not available
            </div>
          )}
        </div>
      )}
      {isValidSrc && !showPlaceholder && (
        <video
          ref={videoRef}
          key={currentUrl} // Force re-render when URL changes
          src={currentUrl}
          controls
          className="w-full h-full object-cover rounded-2xl"
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          preload="metadata"
          crossOrigin="anonymous"
          style={{ display: 'block' }}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}
