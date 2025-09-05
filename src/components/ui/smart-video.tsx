'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface SmartVideoProps {
  video: any
  alt: string
  fallbackLetter: string
  fallbackGradient?: string
  className?: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
  showPhoneFrame?: boolean
}

export function SmartVideo({ 
  video, 
  alt, 
  fallbackLetter, 
  fallbackGradient = "from-blue-500 via-purple-500 to-indigo-600",
  className = "",
  aspectRatio = 'portrait',
  showPhoneFrame = true
}: SmartVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    console.log('🎥 SmartVideo received video data:', video)
    console.log('🎥 Video asset reference:', video?.asset?._ref)
    console.log('🎥 Video asset extension:', video?.asset?.extension)
    
    if (!video?.asset?._ref) {
      console.log('❌ No video asset reference found')
      setHasError(true)
      setIsLoading(false)
      return
    }

    // Generate video URL from Sanity asset reference
    const fileId = video.asset._ref.replace('file-', '')
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    
    console.log('🎬 Video details:', { 
      originalRef: video.asset._ref,
      fileId, 
      projectId, 
      dataset,
      extension: video.asset.extension 
    })
    
    if (!projectId) {
      console.log('❌ No Sanity project ID found')
      setHasError(true)
      setIsLoading(false)
      return
    }

    // Remove the extension suffix from fileId if it exists (e.g., "abc123-mp4" -> "abc123")
    // Then add the proper extension
    const cleanFileId = fileId.replace(/-\w+$/, '')
    const extension = video.asset.extension || 'mp4'
    const videoUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${cleanFileId}.${extension}`
    
    console.log('🔗 Generated video URL:', videoUrl)
    console.log('🔗 Clean file ID:', cleanFileId)
    console.log('🔗 Extension used:', extension)
    
    // Set the video URL directly without testing
    console.log('🎬 Setting video URL directly')
    setVideoUrl(videoUrl)
    setHasError(false)
    setIsLoading(false)
  }, [video])

  const handleVideoError = (event: any) => {
    console.log('❌ Video failed to load:', videoUrl, event)
    setHasError(true)
  }

  const handleVideoLoad = () => {
    console.log('✅ Video loaded successfully:', videoUrl)
    setHasError(false)
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'portrait': return 'aspect-[9/16] max-w-md'
      case 'landscape': return 'aspect-video'
      case 'square': return 'aspect-square'
      default: return 'aspect-[9/16] max-w-md'
    }
  }

  const showPlaceholder = isLoading || hasError || !videoUrl

  if (showPhoneFrame) {
    return (
      <div className={`relative ${getAspectRatioClass()} ${className} phone-frame-container`}>
        {/* Video Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {showPlaceholder ? (
            <div className={`bg-gradient-to-br ${fallbackGradient} flex items-center justify-center w-[90%] h-[90%] rounded-[8%]`}>
              <div className="text-4xl font-bold text-white opacity-30">
                {fallbackLetter}
              </div>
              {isLoading && (
                <div className="absolute bottom-4 left-4 text-sm text-white opacity-70">
                  Loading video...
                </div>
              )}
              {hasError && (
                <div className="absolute bottom-4 left-4 text-sm text-white opacity-70">
                  Video file not found in Sanity
                </div>
              )}
            </div>
          ) : (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-[95%] h-[95%] object-contain rounded-[8%] cursor-pointer"
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* iPhone Frame */}
        <Image 
          src="/iphone_clay_white.png" 
          alt="iPhone mockup frame" 
          className="absolute inset-0 w-full h-full object-contain z-20"
          width={1000}
          height={1000}
        />
      </div>
    )
  }

  // Without phone frame
  return (
    <div className={`relative ${getAspectRatioClass()} ${className}`}>
      {showPlaceholder ? (
        <div className={`bg-gradient-to-br ${fallbackGradient} flex items-center justify-center absolute inset-0 z-10`}>
          <div className="text-6xl font-bold text-white opacity-30">
            {fallbackLetter}
          </div>
          {isLoading && (
            <div className="absolute bottom-4 left-4 text-sm text-white opacity-70">
              Loading video...
            </div>
          )}
          {hasError && (
            <div className="absolute bottom-4 left-4 text-sm text-white opacity-70">
              Video file not found in Sanity
            </div>
          )}
        </div>
      ) : (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain rounded-2xl cursor-pointer"
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          preload="metadata"
          style={{ 
            display: 'block',
            maxWidth: aspectRatio === 'portrait' ? '28rem' : '100%'
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}