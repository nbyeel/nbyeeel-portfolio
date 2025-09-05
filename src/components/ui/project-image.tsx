'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProjectImageProps {
  src: string
  alt: string
  fallbackLetter: string
  fallbackGradient?: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait' | 'dynamic'
}

export function ProjectImage({ 
  src, 
  alt, 
  fallbackLetter, 
  fallbackGradient = "from-blue-500 via-purple-500 to-indigo-600",
  className = "",
  fill = false,
  sizes,
  priority = false,
  aspectRatio = 'auto'
}: ProjectImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = (event: any) => {
    setImageLoading(false)
    if (aspectRatio === 'dynamic' && event.target) {
      setImageDimensions({
        width: event.target.naturalWidth,
        height: event.target.naturalHeight
      })
    }
  }

  // Show placeholder if no valid src, image fails to load
  const isValidSrc = src && typeof src === 'string' && src !== '' && src !== 'http://localhost:3000/' && !src.includes('localhost:3000')
  const showPlaceholder = !isValidSrc || imageError

  // Get aspect ratio class based on prop or dynamic dimensions
  const getAspectRatioClass = () => {
    if (aspectRatio === 'dynamic' && imageDimensions) {
      const ratio = imageDimensions.width / imageDimensions.height
      return `aspect-[${imageDimensions.width}/${imageDimensions.height}]`
    }
    
    switch (aspectRatio) {
      case 'square': return 'aspect-square'
      case 'video': return 'aspect-video'
      case 'portrait': return 'aspect-[3/4]'
      case 'dynamic': return 'min-h-[400px]' // Fallback while loading
      default: return 'min-h-[400px]'
    }
  }

  return (
    <div className={`relative ${getAspectRatioClass()} ${className}`}>
      {showPlaceholder && (
        <div className={`bg-gradient-to-br ${fallbackGradient} flex items-center justify-center absolute inset-0 z-10`}>
          <div className="text-6xl font-bold text-white opacity-30">
            {fallbackLetter}
          </div>
        </div>
      )}
      {isValidSrc && (
        <Image
          src={src}
          alt={alt}
          fill={true}
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  )
}
