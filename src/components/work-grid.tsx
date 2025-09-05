'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProjectImage } from '@/components/ui/project-image'
import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { client, testSanityConnection, safeFetch, getImageUrl } from '@/lib/sanity'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
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
const fallbackProjects = [
  {
    _id: '1',
    title: 'WINZOI App',
    slug: { current: 'winzoi' },
    description: 'Giveaway platform mobile app design with 10k+ user engagements',
            mainImage: {
          image: '/projects/winzoi-hero.jpg',
          orientation: 'landscape' as const,
          alt: 'WINZOI App Cover'
        },
    featured: true
  },
  {
    _id: '2',
    title: 'Fit Flow',
    slug: { current: 'fit-flow' },
    description: 'Health app for iOS - currently in development',
            mainImage: {
          image: '/projects/fit-flow-hero.jpg',
          orientation: 'landscape' as const,
          alt: 'Fit Flow App Cover'
        },
    featured: false
  }
]

export function WorkGrid() {
  const lottieRef = useRef<any>(null)
  const [isPlayingForward, setIsPlayingForward] = useState(true)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [projects, setProjects] = useState(fallbackProjects)
  const [loading, setLoading] = useState(true)
  const [webDevAnimation, setWebDevAnimation] = useState<any>(null)
  const [codingAnimation, setCodingAnimation] = useState<any>(null)

  // Fetch projects from Sanity
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🔍 Starting to fetch projects for WorkGrid...')

        // Test Sanity connection first
        const isConnected = await testSanityConnection()
        console.log('📡 Sanity connected:', isConnected)

        // Only try to fetch from Sanity if connected
        if (isConnected) {
          console.log('📥 Fetching from Sanity...')
          const data = await safeFetch('*[_type == "project"] | order(order asc)', fallbackProjects)
          console.log('📦 Sanity data received:', data)
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
        console.log('✅ Projects loaded for WorkGrid')
      }
    }

    fetchProjects()

    // Load Lottie animations dynamically
    const loadAnimations = async () => {
      try {
        const [webDev, coding] = await Promise.all([
          import('../../public/animations/Web Development.json'),
          import('../../public/animations/web-coding-after-hero.json')
        ])
        setWebDevAnimation(webDev.default)
        setCodingAnimation(coding.default)
      } catch (error) {
        console.log('Failed to load animations:', error)
      }
    }
    
    loadAnimations()
  }, [])

  useEffect(() => {
    const animate = () => {
      if (!lottieRef.current) return

      setCurrentFrame(prev => {
        if (isPlayingForward) {
          if (prev >= 120) {
            setIsPlayingForward(false)
            return 119
          }
          return prev + 1
        } else {
          if (prev <= 0) {
            setIsPlayingForward(true)
            return 1
          }
          return prev - 1
        }
      })
    }

    const interval = setInterval(animate, 33) // ~30fps
    return () => clearInterval(interval)
  }, [isPlayingForward])

  useEffect(() => {
    if (lottieRef.current && typeof lottieRef.current.goToAndStop === 'function') {
      try {
        lottieRef.current.goToAndStop(currentFrame, true)
      } catch (error) {
        // Animation not ready yet
      }
    }
  }, [currentFrame])

  return (
    <section className="py-24 bg-white dark:bg-[#18181B]" style={{ paddingTop: '400px' }}>
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-24 pb-2 md:pb-20">
        {/* Hero Section with Background Text and Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32 relative"
        >
          <h1 
            className="font-neue-montreal-medium pointer-events-none z-0 w-auto overflow-hidden capitalize leading-tight tracking-normal text-zinc-300 dark:text-zinc-700 text-[60px] lg:text-[150px] xl:text-[220px]"
            style={{ 
              fontFamily: 'PP Neue Montreal, sans-serif',
              fontWeight: '600',
              lineHeight: '1.85',
              letterSpacing: '0px'
            }}
          >
            Projects
            <div className="absolute bottom-0 left-0 size-full bg-gradient-to-b from-transparent via-white/90 via-65% to-white dark:via-zinc-900 dark:to-zinc-900"></div>
          </h1>
          
                      {/* Lottie Animation positioned absolutely */}
            <div className="hidden lg:block absolute top-8 -right-10 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                width: 'clamp(280px, 28vw, 550px)',
                height: 'clamp(200px, 20vw, 400px)'
              }}
              className="flex items-center justify-center"
            >
                              {webDevAnimation && (
                                <Lottie 
                                  lottieRef={lottieRef}
                                  animationData={webDevAnimation}
                                  loop={false}
                                  autoplay={false}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                    mixBlendMode: 'multiply'
                                  }}
                                />
                              )}
            </motion.div>
          </div>
          
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

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400">
              <div className="w-4 h-4 border-2 border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading work...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group ${index === 0 ? '-ml-8 lg:-ml-16' : index === 1 ? '-mr-8 lg:-mr-16' : ''}`}
            >
              <Link href={`/work/project/${project.slug.current}`} className="block">
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                  <ProjectImage
                    src={project.mainImage ? getImageUrl(project.mainImage.image) : ''}
                    alt={project.mainImage?.alt || project.title}
                    fallbackLetter={project.slug.current === 'winzoi' ? 'W' : 'F'}
                    fallbackGradient={project.slug.current === 'winzoi' ? 'from-orange-500 via-red-500 to-pink-600' : 'from-green-500 via-teal-500 to-blue-600'}
                    className="relative overflow-hidden rounded-lg"
                    aspectRatio={project.mainImage?.orientation === 'landscape' ? 'video' : project.mainImage?.orientation || 'video'}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                        UI/UX Design
                      </span>
                      {project.featured && (
                        <span className="ml-3 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-inter font-black mb-6 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                      {project.description}
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
          ))}
          </div>
        )}

        {/* Bottom Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 flex justify-center"
        >
          <div 
            style={{
              width: 'clamp(300px, 40vw, 600px)',
              height: 'clamp(200px, 25vw, 400px)'
            }}
            className="flex items-center justify-center"
          >
            {codingAnimation && (
              <Lottie 
                animationData={codingAnimation}
                loop={true}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            )}
          </div>
        </motion.div>


      </div>
    </section>
  )
}
