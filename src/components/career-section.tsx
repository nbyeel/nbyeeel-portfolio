'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { testSanityConnection, safeFetch } from '@/lib/sanity'

interface CareerItem {
  _id: string
  role: string
  company: string
  period: string
  description: string
  order: number
  isCurrent?: boolean
}

const fallbackCareer = [
  {
    _id: '1',
    role: 'Senior UI/UX Designer & Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Leading comprehensive digital transformation projects for diverse clients across mobile apps, web applications, and landing pages. Specializing in end-to-end design solutions that drive user engagement and business growth, with expertise spanning iOS, Android, and web platforms.',
    order: 1,
    isCurrent: true
  },
  {
    _id: '2',
    role: 'Senior UI/UX Designer & Developer',
    company: 'Team Relliks Systems',
    period: '2021 - 2023',
    description: 'Evolved from junior designer to senior leadership, managing complete design-to-development workflows. Led cross-functional teams in creating scalable enterprise solutions, demonstrating exceptional growth in both design expertise and technical implementation capabilities.',
    order: 2,
    isCurrent: false
  },
  {
    _id: '3',
    role: 'Junior UI/UX Designer',
    company: 'Team Relliks Systems',
    period: '2020 - 2021',
    description: 'Started my professional journey in product design, rapidly mastering user-centered design principles and establishing a foundation in creating intuitive digital experiences for complex business applications.',
    order: 3,
    isCurrent: false
  }
]

export function CareerSection() {
  const [career, setCareer] = useState<CareerItem[]>([])
  const [sanityConnected, setSanityConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        console.log('🔍 Testing Sanity connection for career...')
        const isConnected = await testSanityConnection()
        setSanityConnected(isConnected)
        console.log('📡 Sanity connected:', isConnected)
        
        // Only try to fetch from Sanity if connected
        if (isConnected) {
          console.log('📥 Fetching career from Sanity...')
          const data = await safeFetch('*[_type == "career"] { _id, role, company, period, description, order, isCurrent } | order(order asc)', fallbackCareer)
          console.log('📦 Career data received:', data)
          setCareer(data)
        } else {
          console.log('🔄 Using fallback career data (Sanity not connected)')
          setCareer(fallbackCareer)
        }
      } catch (error) {
        console.error('❌ Error fetching career:', error)
        console.log('🔄 Using fallback career data due to error')
        setCareer(fallbackCareer)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCareer()
  }, [])

  return (
    <section className="py-24 bg-white dark:bg-[#18181B] pt-60 pb-60">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-24 pb-2 md:pb-20">
        <div className="mb-32 relative h-96">
          <h1 
            className="font-neue-montreal-medium pointer-events-none absolute top-0 left-0 z-0 w-auto overflow-hidden capitalize leading-tight tracking-normal text-zinc-300 dark:text-zinc-700 text-[80px] lg:text-[200px] xl:text-[300px]"
            style={{ fontFamily: 'Neue Montreal, sans-serif', fontWeight: '500', textShadow: '0 0 0.5px currentColor' }}
          >
            Career
            <div className="absolute bottom-0 left-0 size-full bg-gradient-to-b from-transparent via-white/90 via-65% to-white dark:via-zinc-900 dark:to-zinc-900"></div>
          </h1>
          <div className="absolute top-64 -left-3 z-10 w-full">
            <p className="w-full max-w-4xl leading-tight text-zinc-300 dark:text-zinc-300 text-lg pl-4" style={{ fontSize: '16px', fontWeight: '350' }}>
              <span className="text-[#a1a1aa] dark:text-[#52525B]">
                I have been working as a UI/UX designer and developer for the past four years, specializing<br />
                in comprehensive digital solutions. Joined as a junior designer and now lead end-to-end<br />
                design and development projects as a senior freelancer. Over the past few years I worked<br />
                on highly scalable mobile apps, web applications, and landing pages. Started out in enterprise<br />
                software design, right now I lead digital transformation initiatives across iOS, Android, and<br />
                web platforms.
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-16 mt-48 relative">
          {/* Vertical timeline gradient strip */}
          <div className="absolute left-[8px] top-0 bottom-0 w-1 md:left-[32px]">
            <div className="size-full rounded-full bg-gradient-to-b from-transparent via-[#8346BF] via-20% to-transparent"></div>
          </div>
          
          {isLoading ? (
            // Loading state - show subtle loading spinner
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400">
                <div className="w-4 h-4 border-2 border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading career...</span>
              </div>
            </div>
          ) : (
            // Actual career data
            career.map((job, index) => (
            <div
              key={job._id}
              className="relative flex items-start"
            >
              <div className="timeline-marker absolute left-[2px] top-4 z-10 size-4 rounded-full border-4 border-zinc-200 bg-white shadow-lg dark:border-zinc-700 md:left-[26px]"></div>
              <div className="timeline-content ml-10 flex-1 md:ml-16">
                <div>
                  <div className="mb-1 text-lg font-normal leading-tight tracking-tighter text-zinc-700 dark:text-zinc-300 md:text-xl">
                    {job.role}
                  </div>
                  <div className="mb-2 flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                    <span className="text-base font-medium text-emerald-500 dark:text-emerald-300">
                      {job.company}
                    </span>
                    <span className="size-1 rounded-full bg-zinc-400"></span>
                    <span className="text-xs">
                      {job.period}
                    </span>
                  </div>
                  <div className="prose prose-sm prose-zinc max-w-3xl dark:prose-invert">
                    <p style={{ color: '#3F3F45', fontSize: '14px' }} className="dark:!text-[#D4D4D8]">{job.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  )
}
