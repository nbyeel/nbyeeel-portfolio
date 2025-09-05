'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Users, TrendingUp } from 'lucide-react'
import { ProjectImage } from '@/components/ui/project-image'

const screenshots = [
  {
    title: 'Login Screen',
    description: 'Clean login interface with WINZOI branding and user-friendly form design.',
    image: '/projects/winzoi-login.jpg'
  },
  {
    title: 'Home Screen',
    description: 'Main giveaway listings with active and closed competitions, featuring premium prizes.',
    image: '/projects/winzoi-home.jpg'
  },
  {
    title: 'Account Management',
    description: 'User account overview with profile management and account settings.',
    image: '/projects/winzoi-account.jpg'
  },
  {
    title: 'Profile Details',
    description: 'Detailed user profile with editable information and personal details.',
    image: '/projects/winzoi-profile.jpg'
  },
  {
    title: 'Payment Success',
    description: 'Confirmation screen for successful giveaway entries and payments.',
    image: '/projects/winzoi-payment.jpg'
  }
]

export function WinzoiCaseStudy() {
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
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-inter font-black mb-6">WINZOI App</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              A fully designed iOS mobile application for an online giveaway platform. This project showcases 
              user-centered design principles with a focus on engagement and conversion optimization.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">User Engagements</p>
                  <p className="font-semibold">10k+</p>
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Conversions</p>
                  <p className="font-semibold">20k+</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">2 weeks</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Tools</p>
                  <p className="font-semibold">Figma</p>
                </div>
              </div>
            </div>
          </div>
          
          <ProjectImage
            src="/projects/winzoi-hero.jpg"
            alt="WINZOI App Hero"
            fallbackLetter="W"
            fallbackGradient="from-orange-500 via-red-500 to-pink-600"
            className="aspect-[9/16] rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      {/* Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-6">Project Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Challenge</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Design a mobile application for a giveaway platform that encourages user participation 
              while maintaining a clean, trustworthy interface. The app needed to handle multiple 
              concurrent giveaways and provide seamless user experience for entry and payment processes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Solution</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Created an intuitive mobile-first design with clear visual hierarchy, engaging 
              giveaway displays, and streamlined user flows. Implemented gamification elements 
              and trust indicators to boost user confidence and participation rates.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Screenshots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Key Screens</h2>
        <div className="grid gap-12">
          {screenshots.map((screen, index) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
            <ProjectImage
              src={screen.image}
              alt={screen.title}
              fallbackLetter={screen.title.charAt(0)}
              fallbackGradient="from-orange-400 via-red-400 to-pink-500"
              className="aspect-[9/16] rounded-2xl overflow-hidden"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
              <div>
                <h3 className="text-2xl font-inter font-bold mb-4">{screen.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {screen.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Design Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Design Process</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Research</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Analyzed existing giveaway platforms and user behavior patterns to understand 
              pain points and opportunities for improvement.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Wireframing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Created low-fidelity wireframes to establish information architecture and 
              user flow before moving to high-fidelity designs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Prototyping</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built interactive prototypes in Figma to test user flows and gather feedback 
              before finalizing the design system.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Results & Impact</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">User Engagement</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The app achieved over 10,000 user engagements within the first month of launch, 
                demonstrating strong user interest and platform adoption.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• 10k+ active users</li>
                <li>• 85% user retention rate</li>
                <li>• 4.8/5 app store rating</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">Conversion Success</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Achieved 20,000+ successful conversions, proving the effectiveness of the 
                user-centered design approach and streamlined entry process.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• 20k+ successful entries</li>
                <li>• 92% completion rate</li>
                <li>• 3.2x increase in participation</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
