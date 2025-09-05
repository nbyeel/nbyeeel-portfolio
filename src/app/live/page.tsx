'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LivePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#18181B] relative overflow-hidden">
      {/* Elegant Dotted Background */}
      <div className="absolute inset-0">
        {/* Light Mode Dots */}
        <div className="bg-dot-black/[0.08] absolute inset-0 flex items-center justify-center dark:hidden"></div>
        {/* Dark Mode Dots */}
        <div className="bg-dot-white/[0.08] absolute inset-0 items-center justify-center hidden dark:flex"></div>
        {/* Subtle Gradient Mask */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-zinc-900"></div>
      </div>

      {/* Wireframing/Prototyping Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-60 dark:opacity-40">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-400 dark:text-neutral-600"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        
        {/* Scattered wireframe boxes */}
        <div className="absolute top-1/4 left-1/6 w-24 h-16 border border-neutral-300/50 dark:border-neutral-600/50 rounded-sm"></div>
        <div className="absolute top-1/3 right-1/5 w-32 h-20 border border-neutral-300/50 dark:border-neutral-600/50 rounded-sm"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-12 border border-neutral-300/50 dark:border-neutral-600/50 rounded-sm"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-18 border border-neutral-300/50 dark:border-neutral-600/50 rounded-sm"></div>
        
        {/* Scattered lines */}
        <div className="absolute top-1/2 left-1/4 w-32 h-px bg-neutral-300/50 dark:bg-neutral-600/50"></div>
        <div className="absolute top-2/3 right-1/3 w-24 h-px bg-neutral-300/50 dark:bg-neutral-600/50"></div>
        <div className="absolute bottom-1/5 left-1/5 w-20 h-px bg-neutral-300/50 dark:bg-neutral-600/50"></div>

        {/* Wireframing Crosshairs and Lines - Randomly positioned */}
        {/* Crosshair 1 */}
        <div className="absolute top-[18%] left-[35%] opacity-15 dark:opacity-8">
          <div className="relative w-8 h-8">
            <div className="absolute top-1/2 left-0 w-8 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-1/2 w-px h-8 bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-neutral-600 dark:bg-neutral-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Crosshair 2 */}
        <div className="absolute top-[45%] right-[25%] opacity-15 dark:opacity-8">
          <div className="relative w-6 h-6">
            <div className="absolute top-1/2 left-0 w-6 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-1/2 w-px h-6 bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-neutral-600 dark:bg-neutral-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Crosshair 3 */}
        <div className="absolute bottom-[30%] left-[15%] opacity-15 dark:opacity-8">
          <div className="relative w-10 h-10">
            <div className="absolute top-1/2 left-0 w-10 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-1/2 w-px h-10 bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-neutral-600 dark:bg-neutral-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Crosshair 4 */}
        <div className="absolute top-[65%] left-[55%] opacity-15 dark:opacity-8">
          <div className="relative w-7 h-7">
            <div className="absolute top-1/2 left-0 w-7 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-1/2 w-px h-7 bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-neutral-600 dark:bg-neutral-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Crosshair 5 */}
        <div className="absolute bottom-[15%] right-[40%] opacity-15 dark:opacity-8">
          <div className="relative w-9 h-9">
            <div className="absolute top-1/2 left-0 w-9 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-1/2 w-px h-9 bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-neutral-600 dark:bg-neutral-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Crosshair 6 */}
        <div className="absolute top-[8%] right-[15%] opacity-15 dark:opacity-8">
          <div className="relative w-5 h-5">
            <div className="absolute top-1/2 left-0 w-5 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-1/2 w-px h-5 bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-neutral-600 dark:bg-neutral-400 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Additional Wireframing Lines */}
        {/* Diagonal Line 1 */}
        <div className="absolute top-[25%] left-[20%] w-16 h-px bg-neutral-300/40 dark:bg-neutral-600/40 transform rotate-45 opacity-15 dark:opacity-8"></div>
        
        {/* Diagonal Line 2 */}
        <div className="absolute bottom-[25%] right-[20%] w-20 h-px bg-neutral-300/40 dark:bg-neutral-600/40 transform -rotate-30 opacity-15 dark:opacity-8"></div>
        
        {/* Vertical Line 1 */}
        <div className="absolute top-[35%] right-[35%] w-px h-24 bg-neutral-300/40 dark:bg-neutral-600/40 opacity-15 dark:opacity-8"></div>
        
        {/* Vertical Line 2 */}
        <div className="absolute bottom-[40%] left-[45%] w-px h-16 bg-neutral-300/40 dark:bg-neutral-600/40 opacity-15 dark:opacity-8"></div>

        {/* Corner Markers */}
        {/* Corner Marker 1 */}
        <div className="absolute top-[12%] left-[25%] opacity-15 dark:opacity-8">
          <div className="relative">
            <div className="absolute top-0 left-0 w-3 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 left-0 w-px h-3 bg-neutral-400 dark:bg-neutral-500"></div>
          </div>
        </div>

        {/* Corner Marker 2 */}
        <div className="absolute bottom-[20%] right-[30%] opacity-15 dark:opacity-8">
          <div className="relative">
            <div className="absolute top-0 right-0 w-3 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute top-0 right-0 w-px h-3 bg-neutral-400 dark:bg-neutral-500"></div>
          </div>
        </div>

        {/* Corner Marker 3 */}
        <div className="absolute top-[70%] left-[40%] opacity-15 dark:opacity-8">
          <div className="relative">
            <div className="absolute bottom-0 left-0 w-3 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute bottom-0 left-0 w-px h-3 bg-neutral-400 dark:bg-neutral-500"></div>
          </div>
        </div>

        {/* Corner Marker 4 */}
        <div className="absolute bottom-[35%] left-[60%] opacity-15 dark:opacity-8">
          <div className="relative">
            <div className="absolute bottom-0 right-0 w-3 h-px bg-neutral-400 dark:bg-neutral-500"></div>
            <div className="absolute bottom-0 right-0 w-px h-3 bg-neutral-400 dark:bg-neutral-500"></div>
          </div>
        </div>

        {/* Creative Hand-drawn Style Lines - Designer's Sketching */}
        {/* Flowing Curve 1 */}
        <div className="absolute top-[22%] left-[30%] opacity-12 dark:opacity-6">
          <svg width="60" height="40" viewBox="0 0 60 40" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 35 Q25 5 55 25" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Rough Circle Sketch */}
        <div className="absolute top-[38%] right-[20%] opacity-12 dark:opacity-6">
          <svg width="45" height="45" viewBox="0 0 45 45" className="text-neutral-400 dark:text-neutral-500">
            <circle cx="22.5" cy="22.5" r="18" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeDasharray="2,3"/>
          </svg>
        </div>

        {/* Zigzag Line */}
        <div className="absolute bottom-[28%] left-[25%] opacity-12 dark:opacity-6">
          <svg width="50" height="30" viewBox="0 0 50 30" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 15 L15 5 L25 25 L35 10 L45 20" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Wavy Line */}
        <div className="absolute top-[55%] left-[50%] opacity-12 dark:opacity-6">
          <svg width="70" height="25" viewBox="0 0 70 25" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 12.5 Q15 5 25 12.5 T45 12.5 T65 12.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Rough Rectangle Sketch */}
        <div className="absolute bottom-[45%] right-[35%] opacity-12 dark:opacity-6">
          <svg width="40" height="30" viewBox="0 0 40 30" className="text-neutral-400 dark:text-neutral-500">
            <rect x="5" y="5" width="30" height="20" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeDasharray="3,2"/>
          </svg>
        </div>

        {/* Spiral Sketch */}
        <div className="absolute top-[12%] left-[60%] opacity-12 dark:opacity-6">
          <svg width="35" height="35" viewBox="0 0 35 35" className="text-neutral-400 dark:text-neutral-500">
            <path d="M17.5 17.5 Q17.5 10 10 10 Q2.5 10 2.5 17.5 Q2.5 25 10 25 Q17.5 25 17.5 17.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Arrow Sketch */}
        <div className="absolute bottom-[18%] right-[15%] opacity-12 dark:opacity-6">
          <svg width="55" height="20" viewBox="0 0 55 20" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 10 L45 10 M40 5 L45 10 L40 15" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Doodle Lines */}
        <div className="absolute top-[68%] right-[45%] opacity-12 dark:opacity-6">
          <svg width="30" height="25" viewBox="0 0 30 25" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 20 Q10 5 20 15 Q25 25 30 10" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Rough Triangle */}
        <div className="absolute top-[42%] left-[12%] opacity-12 dark:opacity-6">
          <svg width="35" height="35" viewBox="0 0 35 35" className="text-neutral-400 dark:text-neutral-500">
            <path d="M17.5 5 L30 30 L5 30 Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2,4"/>
          </svg>
        </div>

        {/* Scribble Lines */}
        <div className="absolute bottom-[35%] left-[70%] opacity-12 dark:opacity-6">
          <svg width="25" height="20" viewBox="0 0 25 20" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 15 Q8 5 12 12 Q15 18 20 8" stroke="currentColor" strokeWidth="1.0" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Crossed Lines */}
        <div className="absolute top-[75%] left-[35%] opacity-12 dark:opacity-6">
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 5 L25 25 M25 5 L5 25" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Rough Star */}
        <div className="absolute top-[28%] right-[50%] opacity-12 dark:opacity-6">
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-neutral-400 dark:text-neutral-500">
            <path d="M15 5 L18 12 L25 12 L20 17 L22 24 L15 20 L8 24 L10 17 L5 12 L12 12 Z" stroke="currentColor" strokeWidth="1.0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1,2"/>
          </svg>
        </div>

        {/* Organic Curve */}
        <div className="absolute bottom-[12%] left-[50%] opacity-12 dark:opacity-6">
          <svg width="40" height="35" viewBox="0 0 40 35" className="text-neutral-400 dark:text-neutral-500">
            <path d="M5 30 Q15 5 35 20" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

      </div>


      {/* Main Content - Centered */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 mt-32"
          >


            {/* Main Title */}
            <h1 
              className="font-neue-montreal font-bold leading-none mb-8"
              style={{
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                lineHeight: 'clamp(3rem, 8vw, 5.5rem)',
                color: 'var(--tw-prose-headings)',
                fontWeight: '500',
                letterSpacing: '-2px',
                fontFamily: 'PP Neue Montreal, sans-serif'
              }}
            >
              Something <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">Amazing</span> is Coming
            </h1>
            
          </motion.div>

          {/* Simple Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 mt-8"
          >
            <Link
              href="/"
              className="relative inline-block px-10 py-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all duration-500 hover:scale-105 shadow-[0_0_25px_rgba(16,185,129,0.4),0_0_50px_rgba(16,185,129,0.2)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6),0_0_70px_rgba(16,185,129,0.3)] border border-emerald-400/40 hover:border-emerald-300/60"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/15 to-emerald-300/15 opacity-0 hover:opacity-100 transition-all duration-500"></div>
              <span className="relative z-10">Back to Portfolio</span>
            </Link>
            

          </motion.div>
        </div>
      </main>
    </div>
  )
}
