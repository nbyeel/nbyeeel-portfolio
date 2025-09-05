'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Smartphone, Zap } from 'lucide-react'
import { ProjectImage } from '@/components/ui/project-image'

const screenshots = [
  {
    title: 'Login Screen',
    description: 'Dark theme login interface with Fit Flow branding and clean authentication design.',
    image: '/projects/fit-flow-login.jpg'
  },
  {
    title: 'Health Dashboard',
    description: 'Main health metrics overview with AI-powered insights and real-time data visualization.',
    image: '/projects/fit-flow-home.jpg'
  },
  {
    title: 'Blood Pressure Tracking',
    description: 'Detailed blood pressure monitoring with trend analysis and AI recommendations.',
    image: '/projects/fit-flow-blood-pressure.jpg'
  }
]

export function FitFlowCaseStudy() {
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
            <h1 className="text-5xl md:text-7xl font-inter font-black mb-6">Fit Flow</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              A comprehensive health monitoring app for iOS that combines AI-powered insights with 
              intuitive design to help users track and improve their health metrics.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Platform</p>
                  <p className="font-semibold">iOS</p>
                </div>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-semibold">In Development</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Started</p>
                  <p className="font-semibold">2024</p>
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
            src="/projects/fit-flow-hero.jpg"
            alt="Fit Flow App Hero"
            fallbackLetter="F"
            fallbackGradient="from-green-500 via-teal-500 to-blue-600"
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
              Design a health monitoring app that makes complex health data accessible and actionable 
              for everyday users. The app needed to handle multiple health metrics while providing 
              AI-powered insights in an intuitive, non-intimidating interface.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Solution</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Created a dark-themed, modern health app with clear data visualization, AI-powered 
              recommendations, and a focus on user engagement. Implemented gamification elements 
              and progress tracking to encourage consistent health monitoring.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-inter font-bold mb-4">Health Metrics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive tracking of blood pressure, heart rate, temperature, and oxygen saturation 
              with real-time monitoring and trend analysis.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-inter font-bold mb-4">AI Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intelligent health recommendations and personalized insights based on user data patterns 
              and medical best practices.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-inter font-bold mb-4">Data Visualization</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Beautiful charts and graphs that make complex health data easy to understand and track 
              over time with customizable time ranges.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Screenshots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Key Screens</h2>
        <div className="grid gap-12">
          {screenshots.map((screen, index) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
            <ProjectImage
              src={screen.image}
              alt={screen.title}
              fallbackLetter={screen.title.charAt(0)}
              fallbackGradient="from-green-400 via-teal-400 to-blue-500"
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
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Design Process</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">User Research</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Conducted interviews with health-conscious users to understand their pain points 
              and desired features for health monitoring apps.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Information Architecture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Designed intuitive navigation and data hierarchy to make health information 
              easily accessible and actionable for users.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-inter font-bold mb-4">Visual Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Created a dark theme with vibrant accent colors to reduce eye strain while 
              maintaining visual appeal and data clarity.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Future Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-inter font-bold mb-8">Future Development</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">Planned Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Integration with wearable devices</li>
                <li>• Advanced AI health predictions</li>
                <li>• Social features for health challenges</li>
                <li>• Telemedicine integration</li>
                <li>• Personalized workout recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-inter font-bold mb-4">Development Timeline</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Currently in active development with plans for beta testing in Q2 2024 
                and App Store launch in Q3 2024.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                The app will be developed using React Native for cross-platform compatibility 
                and optimal performance on iOS devices.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
