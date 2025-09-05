'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Calendar, Clock, Users, TrendingUp, ExternalLink, X } from 'lucide-react'
import { ProjectImage } from '@/components/ui/project-image'
import { SmartVideo } from '@/components/ui/smart-video'
import { getImageUrl } from '@/lib/sanity'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  shortInfo?: string
  mainImage?: {
    image: any;
    orientation: 'portrait' | 'landscape' | 'square';
    alt?: string;
  }
  screenshots?: Array<{ 
    mediaType: 'image' | 'video';
    image?: any; 
    video?: any;
    orientation: 'portrait' | 'landscape' | 'square'; 
    alt?: string;
    heading?: string;
    description?: any[]; // Rich text array
  }>
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  projectType?: {
    type: string;
    customText?: string;
  }
  role?: {
    type: string;
    customText?: string;
  }
  category?: {
    type: string;
    customText?: string;
  }
  projectOverview?: {
    challenge: string;
    solution: string;
  }
  designProcess?: Array<{
    title: string;
    icon: {
      type: 'upload' | 'predefined' | 'custom';
      uploadedIcon?: any;
      predefinedIcon?: string;
      customEmoji?: string;
    };
    description: string;
  }>
  resultsAndImpact?: {
    userExperience: {
      description: string;
      bulletPoints: string[];
    };
    technicalExcellence: {
      description: string;
      bulletPoints: string[];
    };
  }
  body?: any[]
}

interface DynamicCaseStudyProps {
  project: Project
}

export function DynamicCaseStudy({ project }: DynamicCaseStudyProps) {
  // Debug: Log the project data received by the component
  console.log('🎨 DynamicCaseStudy received project data:', {
    projectSlug: project.slug?.current,
    projectTitle: project.title,
    projectOverview: project.projectOverview,
    designProcess: project.designProcess,
    projectType: project.projectType,
    role: project.role,
    category: project.category,
    screenshots: project.screenshots?.map(s => ({
      mediaType: s.mediaType,
      hasImage: !!s.image,
      hasVideo: !!s.video,
      videoAsset: s.video?.asset?._ref
    }))
  })

  const [selectedMedia, setSelectedMedia] = useState<{
    type: 'image' | 'video'
    src: string
    alt: string
    index: number
  } | null>(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedMedia])

  // Helper function to get fallback gradient based on project
  const getFallbackGradient = (slug: string) => {
    if (slug === 'winzoi' || slug === 'mobile-app') return 'from-orange-500 via-red-500 to-pink-600'
    if (slug === 'fit-flow') return 'from-green-500 via-teal-500 to-blue-600'
    return 'from-blue-500 via-purple-500 to-pink-600'
  }

  // Helper function to get fallback letter
  const getFallbackLetter = (slug: string) => {
    if (slug === 'winzoi' || slug === 'mobile-app') return 'W'
    if (slug === 'fit-flow') return 'F'
    return project.title.charAt(0)
  }

  // Helper function to get display text from field object
  const getDisplayText = (field: { type: string; customText?: string } | string | undefined, fallback: string) => {
    if (!field) return fallback
    if (typeof field === 'string') return field
    return field.type === 'custom' ? field.customText : field.type?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  }

  return (
    <div className="container-custom px-4">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 mb-32"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-6xl font-inter font-black mb-6">{project.title}</h1>
            <div className="mb-16">
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.shortInfo || 'A showcase of creative work and innovative solutions.'}
              </p>
            </div>
      
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Project Type</p>
                  <p className="font-semibold">{getDisplayText(project.projectType, 'UI/UX Design')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold">{getDisplayText(project.role, 'Designer & Developer')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold">{getDisplayText(project.category, 'UI/UX Design')}</p>
                </div>
              </div>
              <div className="flex items-center">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors ml-8 mt-2"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live
                  </a>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              {project.githubUrl && (
                            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                  View Code
                </a>
              )}
            </div>
          </div>
          
          {project.mainImage && (
            <ProjectImage
                          src={getImageUrl(project.mainImage.image)}
            alt={project.mainImage?.alt || project.title}
            aspectRatio={project.mainImage?.orientation === 'landscape' ? 'video' : project.mainImage?.orientation || 'video'}
              fallbackLetter={getFallbackLetter(project.slug.current)}
              fallbackGradient={getFallbackGradient(project.slug.current)}
              className="aspect-[9/16] rounded-2xl overflow-hidden ml-20"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
            />
          )}
        </div>
      </motion.div>

      {/* Project Overview */}
      {project.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 mt-48"
        >
          <h2 className="text-4xl font-inter font-bold mb-12">Project Overview</h2>
          <div className="mb-32">
            <div className="border-l-4 border-emerald-500 pl-8">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}



      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-32 mt-48"
        >
          <h2 className="text-4xl font-inter font-bold mb-16">Project Highlights</h2>
          
          {/* Large Media Showcase - Editorial Style Layout */}
          <div className="space-y-24">
            {project.screenshots?.map((screenshot, index) => {
              // Debug: Log each screenshot data
              console.log(`Screenshot ${index}:`, screenshot)
              
              // Get media source (only for images, videos handled by SmartVideo)
              const getMediaSrc = () => {
                if (screenshot.mediaType === 'image' && screenshot.image) {
                  return getImageUrl(screenshot.image)
                }
                return ''
              }

              // Get media title
              const getMediaTitle = () => {
                if (screenshot.mediaType === 'video') {
                  return screenshot.alt || ''
                }
                return screenshot.alt || ''
              }

              // Get optimal layout based on orientation
              const getLayoutClass = () => {
                switch (screenshot.orientation) {
                  case 'portrait': return 'max-w-6xl mx-auto' // Full width for portrait to accommodate left-right layout
                  case 'landscape': return 'max-w-6xl mx-auto' // Wide for landscape
                  case 'square': return 'max-w-4xl mx-auto' // Balanced for square
                  default: return 'max-w-4xl mx-auto'
                }
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                >
                  <div className={getLayoutClass()}>
                    {/* Content Above Media - Only for Landscape */}
                    {screenshot.orientation === 'landscape' && (screenshot.heading || screenshot.description) && (
                      <div className="mb-8 text-left">
                        {screenshot.heading && (
                          <div className="mb-4">
                            <h3 className="text-2xl font-inter font-bold text-gray-900 dark:text-white">
                              {screenshot.heading}
                            </h3>
                          </div>
                        )}
                        {screenshot.description && (
                          <div className="mb-6">
                            <div className="prose prose-lg max-w-none">
                              <PortableText
                                value={screenshot.description}
                                components={{
                                  block: {
                                    normal: ({ children }: { children: React.ReactNode }) => (
                                      <p className="leading-relaxed mb-6 text-lg text-[#374151] dark:text-[#D1D5DA]">
                                        {children}
                                      </p>
                                    ),
                                    h1: ({ children }: { children: React.ReactNode }) => (
                                      <h1 className="text-3xl font-bold mt-16 mb-8 leading-tight scroll-mt-24 text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h1>
                                    ),
                                    h2: ({ children }: { children: React.ReactNode }) => (
                                      <h2 className="text-3xl font-bold mt-16 mb-8 leading-tight scroll-mt-24 text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h2>
                                    ),
                                    h3: ({ children }: { children: React.ReactNode }) => (
                                      <h3 className="text-2xl font-semibold mt-12 mb-6 leading-tight scroll-mt-20 text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h3>
                                    ),
                                    h4: ({ children }: { children: React.ReactNode }) => (
                                      <h4 className="text-xl font-semibold mt-10 mb-4 leading-tight scroll-mt-16 text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h4>
                                    ),
                                    blockquote: ({ children }: { children: React.ReactNode }) => (
                                      <blockquote className="text-lg text-zinc-600 dark:text-zinc-400 italic leading-relaxed border-l-4 border-emerald-500 pl-6 my-6">
                                        {children}
                                      </blockquote>
                                    ),
                                  },
                                  marks: {
                                    strong: ({ children }: { children: React.ReactNode }) => (
                                      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        {children}
                                      </strong>
                                    ),
                                    em: ({ children }: { children: React.ReactNode }) => (
                                      <em className="italic text-[#374151] dark:text-[#D1D5DA]">
                                        {children}
                                      </em>
                                    ),
                                    code: ({ children }: { children: React.ReactNode }) => (
                                      <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200">
                                        {children}
                                      </code>
                                    ),
                                    underline: ({ children }: { children: React.ReactNode }) => (
                                      <u className="underline">
                                        {children}
                                      </u>
                                    ),
                                    'strike-through': ({ children }: { children: React.ReactNode }) => (
                                      <s className="line-through text-gray-500">
                                        {children}
                                      </s>
                                    ),
                                  },
                                  list: {
                                    bullet: ({ children }: { children: React.ReactNode }) => (
                                      <ul className="my-6 space-y-3 list-none">
                                        {children}
                                      </ul>
                                    ),
                                    number: ({ children }: { children: React.ReactNode }) => (
                                      <ol className="my-6 space-y-3 list-decimal list-inside">
                                        {children}
                                      </ol>
                                    ),
                                  },
                                  listItem: ({ children }: { children: React.ReactNode }) => (
                                    <li className="text-lg leading-relaxed flex items-start gap-3 text-[#374151] dark:text-[#D1D5DA]">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                      <span>{children}</span>
                                    </li>
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Layout: Portrait IMAGES get left-right layout, Portrait VIDEOS and others stay centered */}
                    {screenshot.orientation === 'portrait' && screenshot.mediaType === 'image' ? (
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Portrait Image - Left Side */}
                        <div className="order-1 md:order-1">
                     <div 
                       className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
                       onClick={() => {
                           setSelectedMedia({
                             type: 'image',
                             src: getMediaSrc(),
                             alt: getMediaTitle(),
                             index
                           })
                            }}
                          >
                            <ProjectImage
                              src={getMediaSrc()}
                              alt={getMediaTitle()}
                              fallbackLetter={getFallbackLetter(project.slug.current)}
                              fallbackGradient={getFallbackGradient(project.slug.current)}
                              className={`w-full aspect-[14/20] object-contain`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                            />
                          </div>
                        </div>

                        {/* Portrait Description - Right Side */}
                        <div className="order-2 md:order-2 flex flex-col justify-center">
                          {screenshot.heading && (
                            <div className="mb-6">
                              <h3 className="text-3xl font-inter font-bold text-gray-900 dark:text-white">
                                {screenshot.heading}
                              </h3>
                            </div>
                          )}
                          {screenshot.description && (
                            <div className="prose prose-lg max-w-none">
                              <PortableText
                                value={screenshot.description}
                                components={{
                                  block: {
                                    normal: ({ children }: { children: React.ReactNode }) => (
                                      <p className="leading-relaxed mb-6 text-lg text-[#374151] dark:text-[#D1D5DA]">
                                        {children}
                                      </p>
                                    ),
                                    h1: ({ children }: { children: React.ReactNode }) => (
                                      <h1 className="text-3xl font-bold mt-16 mb-8 leading-tight scroll-mt-24 text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h1>
                                    ),
                                    h2: ({ children }: { children: React.ReactNode }) => (
                                      <h2 className="text-3xl font-bold mt-16 mb-8 leading-tight scroll-mt-24 text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h2>
                                    ),
                                    h3: ({ children }: { children: React.ReactNode }) => (
                                      <h3 className="text-3xl font-semibold mt-8 mb-6 leading-tight text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h3>
                                    ),
                                    h4: ({ children }: { children: React.ReactNode }) => (
                                      <h4 className="text-xl font-semibold mt-6 mb-4 leading-tight text-[#111827] dark:text-[#FFFFFF]">
                                        {children}
                                      </h4>
                                    ),
                                    blockquote: ({ children }: { children: React.ReactNode }) => (
                                      <blockquote className="text-lg text-zinc-600 dark:text-zinc-400 italic leading-relaxed border-l-4 border-emerald-500 pl-6 my-6">
                                        {children}
                                      </blockquote>
                                    ),
                                  },
                                  marks: {
                                    strong: ({ children }: { children: React.ReactNode }) => (
                                      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        {children}
                                      </strong>
                                    ),
                                    em: ({ children }: { children: React.ReactNode }) => (
                                      <em className="italic text-[#374151] dark:text-[#D1D5DA]">
                                        {children}
                                      </em>
                                    ),
                                    code: ({ children }: { children: React.ReactNode }) => (
                                      <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200">
                                        {children}
                                      </code>
                                    ),
                                    underline: ({ children }: { children: React.ReactNode }) => (
                                      <u className="underline">
                                        {children}
                                      </u>
                                    ),
                                    'strike-through': ({ children }: { children: React.ReactNode }) => (
                                      <s className="line-through text-gray-500">
                                        {children}
                                      </s>
                                    ),
                                  },
                                  list: {
                                    bullet: ({ children }: { children: React.ReactNode }) => (
                                      <ul className="my-6 space-y-3 list-none">
                                        {children}
                                      </ul>
                                    ),
                                    number: ({ children }: { children: React.ReactNode }) => (
                                      <ol className="my-6 space-y-3 list-decimal list-inside">
                                        {children}
                                      </ol>
                                    ),
                                  },
                                  listItem: ({ children }: { children: React.ReactNode }) => (
                                    <li className="text-lg leading-relaxed flex items-start gap-3 text-[#374151] dark:text-[#D1D5DA]">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                      <span>{children}</span>
                                    </li>
                                  ),
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Non-portrait IMAGES content stays centered as before */
                      <>
                        {/* Large Media Display */}
                       {screenshot.mediaType === 'video' && screenshot.video && screenshot.video.asset && screenshot.video.asset._ref ? (
                           <div className="flex justify-center">
                         <SmartVideo
                           video={screenshot.video}
                           alt={getMediaTitle()}
                           fallbackLetter={getFallbackLetter(project.slug.current)}
                           fallbackGradient={getFallbackGradient(project.slug.current)}
                           className={`w-full ${screenshot.orientation === 'portrait' ? 'aspect-[3/4]' : screenshot.orientation === 'square' ? 'aspect-square' : 'aspect-video'}`}
                               aspectRatio={screenshot.orientation === 'portrait' ? 'portrait' : screenshot.orientation === 'square' ? 'square' : 'landscape'}
                               showPhoneFrame={project.slug?.current === 'winzoi' || project.slug?.current === 'mobile-app' || project.title.toLowerCase().includes('winzoi')}
                             />
                           </div>
                         ) : (
                           <div 
                             className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
                             onClick={() => {
                               setSelectedMedia({
                                 type: 'image',
                                 src: getMediaSrc(),
                                 alt: getMediaTitle(),
                                 index
                               })
                             }}
                           >
                         <ProjectImage
                           src={getMediaSrc()}
                           alt={getMediaTitle()}
                           fallbackLetter={getFallbackLetter(project.slug.current)}
                           fallbackGradient={getFallbackGradient(project.slug.current)}
                               className={`w-full ${screenshot.orientation === 'portrait' ? 'aspect-[11/20]' : screenshot.orientation === 'square' ? 'aspect-square' : 'aspect-video'} object-contain`}
                           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                         />
                           </div>
                       )}

                        {/* Content Below Media - Only for Portrait Videos and Square */}
                    {(screenshot.orientation === 'portrait' || screenshot.orientation === 'square') && getMediaTitle() && (
                      <div className="mt-8 text-center">
                        <div className="mb-4">
                          <h3 className="text-xl font-inter font-bold text-gray-900 dark:text-white">
                            {getMediaTitle()}
                          </h3>
                        </div>
                      </div>
                    )}
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Beautiful Separator */}
      <div className="flex items-center justify-center my-20">
        <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full"></div>
        <div className="mx-6">
          <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
        </div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-full"></div>
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-inter font-bold mb-12">Technologies Used</h2>
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Design Process */}
      {project.designProcess && project.designProcess.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-inter font-bold mb-12">Design Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.designProcess.map((step, index) => {
              // Helper function to get icon display
              const getIconDisplay = () => {
                if (step.icon.type === 'upload' && step.icon.uploadedIcon) {
                  return (
                    <Image 
                      src={getImageUrl(step.icon.uploadedIcon)} 
                      alt={`${step.title} icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain text-white"
                    />
                  )
                } else if (step.icon.type === 'custom' && step.icon.customEmoji) {
                  return (
                    <div className="h-6 w-6 flex items-center justify-center text-white">
                      {step.icon.customEmoji}
                    </div>
                  )
                } else if (step.icon.type === 'predefined' && step.icon.predefinedIcon) {
                  // Map predefined icons to white icons for display
                  const iconMap: { [key: string]: string } = {
                    'search': '🔍',
                    'lightbulb': '💡',
                    'chart': '📊',
                    'clipboard': '📋',
                    'target': '🎯',
                    'analytics': '📈',
                    'document': '📝',
                    'pencil': '✏️',
                    'wireframe': '📋',
                    'sketch': '🎨',
                    'ruler': '📐',
                    'mobile': '📱',
                    'mouse': '🖱️',
                    'controller': '🎮',
                    'phone': '📱',
                    'computer': '💻',
                    'link': '🔗',
                    'lightning': '⚡',
                    'design': '🎨',
                    'development': '🔧',
                    'testing': '🧪',
                    'launch': '🚀',
                    'app': '📱',
                    'web': '🌐',
                    'strategy': '🎯',
                    'feedback': '💬',
                    'data': '📊',
                    'ux': '🎭',
                    'ui': '🎨'
                  }
                  return (
                    <div className="h-6 w-6 flex items-center justify-center text-white">
                      {iconMap[step.icon.predefinedIcon] || '📋'}
                    </div>
                  )
                }
                return (
                  <div className="h-6 w-6 flex items-center justify-center text-white">
                    📋
                  </div>
                )
              }

              // Get different colored backgrounds for each card
              const getCardColors = (index: number) => {
                const colors = [
                  'bg-blue-500', // Blue for Research
                  'bg-purple-500', // Purple for Wireframing  
                  'bg-orange-500', // Orange for Prototyping
                ]
                return colors[index % colors.length]
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${getCardColors(index)}`}>
                      {getIconDisplay()}
                    </div>
                    <h3 className="text-xl font-inter font-bold mb-3 text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Results & Impact */}
      {project.resultsAndImpact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-inter font-bold mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* User Experience Section */}
            {project.resultsAndImpact.userExperience && (
              <div className="border-l-4 border-emerald-500 pl-8">
                <h3 className="text-2xl font-inter font-bold mb-6 text-gray-900 dark:text-white">User Experience</h3>
                {project.resultsAndImpact.userExperience.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">
                    {project.resultsAndImpact.userExperience.description}
                  </p>
                )}
                {project.resultsAndImpact.userExperience.bulletPoints && project.resultsAndImpact.userExperience.bulletPoints.length > 0 && (
                  <div className="space-y-3">
                    {project.resultsAndImpact.userExperience.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4"></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Technical Excellence Section */}
            {project.resultsAndImpact.technicalExcellence && (
              <div className="border-l-4 border-emerald-500 pl-8">
                <h3 className="text-2xl font-inter font-bold mb-6 text-gray-900 dark:text-white">Technical Excellence</h3>
                {project.resultsAndImpact.technicalExcellence.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">
                    {project.resultsAndImpact.technicalExcellence.description}
                  </p>
                )}
                {project.resultsAndImpact.technicalExcellence.bulletPoints && project.resultsAndImpact.technicalExcellence.bulletPoints.length > 0 && (
                  <div className="space-y-3">
                    {project.resultsAndImpact.technicalExcellence.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4"></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Media Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedMedia.type === 'image' ? (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  unoptimized
                />
              ) : (
                <div className="max-w-full max-h-full">
                  {project.screenshots?.[selectedMedia.index]?.video && project.screenshots?.[selectedMedia.index]?.video.asset && project.screenshots?.[selectedMedia.index]?.video.asset._ref ? (
                    <SmartVideo
                      video={project.screenshots?.[selectedMedia.index]?.video}
                      alt={selectedMedia.alt}
                      fallbackLetter={getFallbackLetter(project.slug.current)}
                      fallbackGradient={getFallbackGradient(project.slug.current)}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      aspectRatio="landscape"
                      showPhoneFrame={project.slug?.current === 'winzoi' || project.slug?.current === 'mobile-app' || project.title.toLowerCase().includes('winzoi')}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">Video not available</p>
                    </div>
                  )}
                </div>
              )}
            </div>


          </div>
        </motion.div>
      )}
    </div>
  )
}
