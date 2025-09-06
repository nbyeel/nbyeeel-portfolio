'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client, testSanityConnection, safeFetch } from '@/lib/sanity'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  mainImage?: string
  categories?: string[]
}

// Fallback data for when Sanity is not available
const fallbackPosts: Post[] = [
  {
    _id: '1',
    title: 'Designing for Mobile-First: Lessons from WINZOI',
    slug: { current: 'designing-for-mobile-first-lessons-from-winzoi' },
    excerpt: 'Exploring the challenges and solutions in creating a mobile-first giveaway platform that serves millions of users.',
    publishedAt: '2024-03-15',
    categories: ['Mobile Design', 'UX']
  },
  {
    _id: '2',
    title: 'The Psychology of User Interface Design',
    slug: { current: 'the-psychology-of-user-interface-design' },
    excerpt: 'How understanding human psychology can lead to better user experiences and higher engagement rates.',
    publishedAt: '2024-02-28',
    categories: ['Psychology', 'UI Design']
  },
  {
    _id: '3',
    title: 'Building Design Systems for Scale',
    slug: { current: 'building-design-systems-for-scale' },
    excerpt: 'My approach to creating scalable design systems that maintain consistency across large applications.',
    publishedAt: '2024-01-20',
    categories: ['Design Systems', 'Scalability']
  },
  {
    _id: '4',
    title: 'From Figma to Reality: The WINZOI Journey',
    slug: { current: 'from-figma-to-reality-the-winzoi-journey' },
    excerpt: 'A detailed case study of how WINZOI evolved from initial concepts to a fully functional mobile application.',
    publishedAt: '2023-12-10',
    categories: ['Case Study', 'Development']
  }
]

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts)
  const [loading, setLoading] = useState(true)
  const [sanityConnected, setSanityConnected] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('🔍 Starting to fetch blog posts...')
        
        // Test Sanity connection first
        const isConnected = await testSanityConnection()
        setSanityConnected(isConnected)
        console.log('📡 Sanity connected:', isConnected)
        
        // Only try to fetch from Sanity if connected
        if (isConnected) {
          console.log('📥 Fetching from Sanity...')
          const data = await safeFetch('*[_type == "post"] | order(publishedAt desc)', fallbackPosts)
          console.log('📦 Sanity data received:', data)
          setPosts(data)
        } else {
          console.log('🔄 Using fallback data (Sanity not connected)')
          setPosts(fallbackPosts)
        }
      } catch (error) {
        console.error('❌ Error fetching posts:', error)
        console.log('🔄 Using fallback data due to error')
        setPosts(fallbackPosts)
      } finally {
        setLoading(false)
        console.log('✅ Blog posts loaded:', posts.length)
      }
    }

    fetchPosts()
  }, [])

  console.log('🎨 Rendering blog section with', posts.length, 'posts')

  if (loading) {
    return (
      <section className="py-24 bg-white dark:bg-[#18181B]">
        <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-24 pb-2 md:pb-20">
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner text="Loading blog posts..." />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white dark:bg-[#18181B]" id="blog">
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-24 pb-2 md:pb-20">
        <div className="mb-32 relative h-96">
          <h1 
            className="font-neue-montreal-medium pointer-events-none absolute top-0 left-0 z-0 w-auto overflow-hidden capitalize leading-tight tracking-normal text-zinc-300 dark:text-zinc-700 text-[60px] sm:text-[80px] lg:text-[200px] xl:text-[300px]"
            style={{ fontFamily: 'Neue Montreal, sans-serif', fontWeight: '500', textShadow: '0 0 0.5px currentColor' }}
          >
            Blog
            <div className="absolute bottom-0 left-0 size-full bg-gradient-to-b from-transparent via-white/90 via-65% to-white dark:via-zinc-900 dark:to-zinc-900"></div>
          </h1>
          <div className="absolute top-32 sm:top-48 md:top-64 -left-1 sm:-left-2 md:-left-3 z-10 w-full">
            <p className="w-full max-w-4xl leading-tight text-zinc-300 dark:text-zinc-300 text-sm sm:text-base md:text-lg pl-2 sm:pl-3 md:pl-4" style={{ fontSize: 'clamp(14px, 2vw, 17px)', fontWeight: '350' }}>
              <span className="text-[#a1a1aa] dark:text-[#52525B]">
                This is where I try to write and share insights, case studies, and lessons from my<br />
                experience in UI and UX design. If you are interested in exploring these topics further,<br />
                please feel free to contact me.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6 md:mt-40">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mt-1 list-none gap-4 border-b-2 border-zinc-100 dark:border-zinc-800 lg:mt-3"
              >
                                       <Link href={`/posts/article/${post.slug.current}`} className="flex flex-col gap-2">
                  <div className="flex flex-col items-start">
                    <div className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[50px] xl:text-[60px] font-normal leading-tight tracking-tighter text-zinc-700 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-300">
                      {post.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pb-2 text-xs sm:text-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No blog posts available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
