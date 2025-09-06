'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client, testSanityConnection, safeFetch, getImageUrl } from '@/lib/sanity'
import { ProjectImage } from '@/components/ui/project-image'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

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
    alt?: string
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
}

// Fallback data for when Sanity is not available
const fallbackProjects: Project[] = [
      {
      _id: '1',
      title: 'WINZOI App',
      slug: { current: 'winzoi' },
      description: 'A fully designed iOS mobile application for an online giveaway platform with interactive prototypes.',
      mainImage: {
        image: '/projects/winzoi-hero.jpg',
        orientation: 'landscape' as const,
        alt: 'WINZOI App Cover'
      },
    screenshots: [
      { mediaType: 'image' as const, image: '/projects/winzoi-login.jpg', orientation: 'portrait' as const },
      { mediaType: 'image' as const, image: '/projects/winzoi-home.jpg', orientation: 'portrait' as const },
      { mediaType: 'image' as const, image: '/projects/winzoi-account.jpg', orientation: 'portrait' as const },
      { mediaType: 'image' as const, image: '/projects/winzoi-profile.jpg', orientation: 'portrait' as const },
      { mediaType: 'image' as const, image: '/projects/winzoi-payment.jpg', orientation: 'portrait' as const }
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    liveUrl: 'https://winzoi.com',
    featured: true
  },
      {
      _id: '2',
      title: 'Fit Flow',
      slug: { current: 'fit-flow' },
      description: 'Health app for iOS - currently in development.',
      mainImage: {
        image: '/projects/fit-flow-hero.jpg',
        orientation: 'landscape' as const,
        alt: 'Fit Flow App Cover'
      },
    screenshots: [
      { mediaType: 'image' as const, image: '/projects/fit-flow-login.jpg', orientation: 'portrait' as const },
      { mediaType: 'image' as const, image: '/projects/fit-flow-home.jpg', orientation: 'portrait' as const },
      { mediaType: 'image' as const, image: '/projects/fit-flow-blood-pressure.jpg', orientation: 'portrait' as const }
    ],
    technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
    liveUrl: 'https://fitflow.app',
    featured: true
  }
]

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)
  const [sanityConnected, setSanityConnected] = useState(false)
  const animationRef = useRef<HTMLDivElement | null>(null)
  const lottieRef = useRef<any>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isLottieReady, setIsLottieReady] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🔍 Starting to fetch projects...')
        
        // Test Sanity connection first
        const isConnected = await testSanityConnection()
        setSanityConnected(isConnected)
        console.log('📡 Sanity connected:', isConnected)
        
        // Only try to fetch from Sanity if connected
        if (isConnected) {
          console.log('📥 Fetching from Sanity...')
          const data = await safeFetch('*[_type == "project"] { _id, title, slug, description, shortInfo, mainImage, featured, order } | order(order asc)', fallbackProjects)
          console.log('📦 Sanity data received:', data)
          console.log('🖼️ Image data:', data.map((p: any) => ({ title: p.title, mainImage: p.mainImage })))
          setProjects(data)
        } else {
          console.log('🔄 Using fallback data (Sanity not connected)')
          setProjects(fallbackProjects)
        }
      } catch (error) {
        console.error('❌ Error fetching projects:', error)
        console.log('🔄 Using fallback data due to error')
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
        console.log('✅ Projects loaded:', projects.length)
      }
    }

    fetchProjects()
  }, [])

  // Scroll handler for animation control
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (!animationRef.current) return

      const rect = animationRef.current.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      
      if (!isVisible) {
        setIsInView(false)
        // Stop the animation when out of view
        if (isLottieReady && lottieRef.current && typeof lottieRef.current.goToAndStop === 'function') {
          try {
            lottieRef.current.goToAndStop(0, true)
          } catch (error) {
            console.log('Lottie not ready yet')
          }
        }
        setCurrentFrame(0)
        return
      }

      if (!isInView) {
        console.log('Animation coming into view')
        setIsInView(true)
        
        // Calculate frame based on current scroll position relative to animation element
        const rect = animationRef.current.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementHeight = rect.height
        const viewportHeight = window.innerHeight
        
        // Calculate how much of the element is visible and map to frame range
        const visibleRatio = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight))
        const calculatedFrame = Math.round(visibleRatio * 150)
        
        console.log('Setting frame based on scroll position:', calculatedFrame)
        setCurrentFrame(calculatedFrame)
        lastScrollY = window.scrollY
        return
      }

      const scrollY = window.scrollY
      const scrollDelta = scrollY - lastScrollY
      lastScrollY = scrollY

      if (Math.abs(scrollDelta) > 0) {
        const sensitivity = 0.1
        const frameDelta = scrollDelta * sensitivity
        
        setCurrentFrame(prevFrame => {
          const newFrame = prevFrame + frameDelta
          const clampedFrame = Math.max(0, Math.min(150, newFrame))
          console.log('Frame update:', { prevFrame, frameDelta, newFrame, clampedFrame })
          return clampedFrame
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView, isLottieReady])

  // Update Lottie animation frame
  useEffect(() => {
    if (isLottieReady && lottieRef.current && typeof lottieRef.current.goToAndStop === 'function') {
      try {
        console.log('Updating Lottie frame:', currentFrame, 'isInView:', isInView)
        lottieRef.current.goToAndStop(currentFrame, true)
      } catch (error) {
        console.log('Lottie not ready yet')
      }
    }
  }, [currentFrame, isInView, isLottieReady])

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-[#18181B]">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-24 pb-2 md:pb-20">
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner text="Loading projects..." />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white dark:bg-[#18181B]">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-[120px] lg:px-24 pb-2 md:pb-20">
        {/* Animation placeholder between hero and projects */}
        <div ref={animationRef} className="flex justify-center items-center py-[100px]">
          <motion.div
            style={{
              width: 'clamp(300px, 35vw, 600px)',
              height: 'clamp(225px, 25vw, 450px)'
            }}
            className="flex items-center justify-center"
          >
            <Lottie 
              lottieRef={lottieRef}
              animationData={require('/public/animations/Cat-Coding.json')}
              loop={false}
              autoplay={false}
              onDOMLoaded={() => {
                console.log('Lottie loaded, setting frame 0')
                setIsLottieReady(true)
                if (lottieRef.current && typeof lottieRef.current.goToAndStop === 'function') {
                  try {
                    lottieRef.current.goToAndStop(0, true)
                  } catch (error) {
                    console.log('Lottie not ready yet')
                  }
                }
              }}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </motion.div>
        </div>

        <div id="projects" className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-32 relative h-96"
          >
            <h1 
              className="font-neue-montreal-medium pointer-events-none absolute top-0 left-0 z-0 w-auto overflow-hidden capitalize leading-tight tracking-normal text-zinc-300 dark:text-zinc-700 text-[80px] lg:text-[200px] xl:text-[300px]"
              style={{ 
                fontFamily: 'PP Neue Montreal, sans-serif', 
                fontWeight: '500',
                lineHeight: '1.25',
                letterSpacing: '0px'
              }}
            >
              Projects
              <div className="absolute bottom-0 left-0 size-full bg-gradient-to-b from-transparent via-white/90 via-65% to-white dark:via-zinc-900 dark:to-zinc-900"></div>
            </h1>
            <div className="absolute top-64 left-0 z-10 w-full">
              <p className="w-full max-w-4xl leading-tight text-zinc-300 dark:text-zinc-300 text-lg pl-4" style={{ color: '#a1a1aa', fontSize: '16px', fontWeight: '400' }}>
                <span className="dark:text-[#52525B]">
                  A showcase of my recent work where design and engineering meets. Each<br />
                  project reflects creativity, functionality, and attention to detail. These projects<br />
                  highlight my journey of turning concepts into digital experiences. If you are<br />
                  interested, please reach out.
                </span>
              </p>
            </div>
          </motion.div>

          <div className="space-y-24">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  viewport={{ once: true }}
                  className={`group ${index === 0 ? '-ml-8 lg:-ml-16' : index === 1 ? '-mr-8 lg:-mr-16' : ''}`}
                >
                  <Link href={`/work/project/${project.slug.current}`} className="block">
                    <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                      <ProjectImage
                        src={project.mainImage ? getImageUrl(project.mainImage.image) : ''}
                        alt={project.mainImage?.alt || project.title}
                        fallbackLetter={project.slug.current === 'winzoi' ? 'W' : 'F'}
                        fallbackGradient={project.slug.current === 'winzoi' ? 'from-orange-500 via-red-500 to-pink-600' : 'from-green-500 via-teal-500 to-blue-600'}
                        className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        aspectRatio={project.mainImage?.orientation === 'landscape' ? 'video' : project.mainImage?.orientation || 'video'}
                      />

                      <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-inter font-black mb-6 leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                          {project.shortInfo || project.description}
                        </p>

                        <div className="flex items-center text-gray-500 dark:text-gray-500">
                          <span className="text-lg font-medium">View case study</span>
                          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No projects available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
