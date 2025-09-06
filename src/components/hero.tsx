'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('dark')
  const animationRef = useRef<HTMLDivElement | null>(null)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
    
    // Set initial theme based on system preference if no theme is set
    if (!theme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setLocalTheme(systemPrefersDark ? 'dark' : 'light')
    }
  }, [])

  // Sync local theme with actual theme
  useEffect(() => {
    if (mounted && theme) {
      // Handle system theme by checking if it resolves to light or dark
      if (theme === 'system') {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setLocalTheme(systemPrefersDark ? 'dark' : 'light')
      } else if (theme === 'light' || theme === 'dark') {
        setLocalTheme(theme)
      }
    }
  }, [theme, mounted])



  // Handle theme toggle with animation
  const handleThemeToggle = () => {
    // REMOVED: if (isAnimating) return - No more click blocking!
    
    setIsAnimating(true)
    const newTheme = localTheme === 'dark' ? 'light' : 'dark'
    
    // Update local theme immediately for animation
    setLocalTheme(newTheme)
    
    // Update global theme immediately - no delay!
    setTheme(newTheme)
    
    // Reset animation state quickly
    setTimeout(() => {
      setIsAnimating(false)
    }, 200) // Much shorter time for responsiveness
  }

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#18181B] relative overflow-hidden pt-32">
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
          <div className="max-w-none text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center py-16"
            >
              <LoadingSpinner text="Loading..." />
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  const isDarkMode = localTheme === 'dark'
  
  return (
    <section className="min-h-screen flex justify-center bg-white dark:bg-[#18181B] relative overflow-hidden pt-16 sm:pt-32 md:pt-48 lg:pt-[25rem]">
      {/* Dotted Background Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Light Mode Dots */}
        <div className="bg-dot-black/[0.1] absolute inset-0 flex items-center justify-center dark:hidden"></div>
        {/* Dark Mode Dots */}
        <div className="bg-dot-white/[0.1] absolute inset-0 items-center justify-center hidden dark:flex"></div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-zinc-900"></div>
      </div>
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main hero text with exact jineshb.me styling */}
                 <div
            className="font-neue-montreal font-bold leading-none"
                   style={{
              fontSize: 'clamp(2.75rem, 8.5vw, 8.5rem)',
              lineHeight: 'clamp(2.75rem, 8.5vw, 8.5rem)',
              color: isDarkMode ? '#A1A1AA' : '#71717A',
              fontWeight: '500',
              letterSpacing: '-3px',
              fontFamily: 'PP Neue Montreal, sans-serif'
            }}
          >
            {/* Line 1: UI & UX designer with modern toggle button */}
            <div className="flex items-center justify-center flex-wrap mb-[-0.5rem] gap-1 sm:gap-2 md:gap-0">
              <span style={{ 
                fontWeight: '500'
              }}>Ui & UX</span>
              <div 
                className="relative mx-2 sm:mx-4 md:mx-6"
                style={{
                  width: 'clamp(80px, 15vw, 162px)',
                  height: 'clamp(50px, 8vw, 100px)'
                }}
              >
                {/* Modern Toggle Button Container */}
                <div className="relative w-full h-full">
                  
                  {/* Main Toggle Track */}
                  <motion.div
                    className="absolute inset-0 rounded-[40px] border border-[#2A3148]/[0.04] p-2"
                    style={{
                      background: isDarkMode ? '#535B66' : '#E1E3EA',
                      pointerEvents: isAnimating ? 'none' : 'auto'
                    }}
                  >
                    
                    {/* Fixed Button with Sun/Moon Icon - Two Layer Structure */}
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center rounded-[32px] p-4 lg:p-8 transition-all duration-300 ease-in-out hover:scale-[0.98]"
                      style={{
                        width: 'clamp(50px, 12vw, 80px)',
                        height: 'calc(100% - 8px)',
                        left: 'clamp(8px, 2vw, 13px)',
                        transformOrigin: 'center center'
                      }}
                    >

                      

                      
                      {/* Main button content */}
                      <div
                        className={`relative flex flex-col items-center justify-center rounded-[32px] p-4 lg:p-8 transition-all duration-500 ease-in-out cursor-pointer ${
                          isDarkMode ? 'custom-shadow-dark' : 'custom-shadow-light'
                        }`}
                        onClick={handleThemeToggle}
                        style={{
                          width: 'clamp(60px, 13vw, 90px)',
                          height: 'clamp(52px, 10vw, 82px)',
                          border: isDarkMode ? '1px solid #5e5e61' : '1px solid rgba(0,0,0,0.1)',
                        }}
                      >

                        

                        
                      {/* Sun Icon (Light Mode) */}
                      <motion.div
                        animate={{
                          opacity: isDarkMode ? 0 : 1,
                          scale: isDarkMode ? 0.8 : 1,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                        style={{
                          display: isDarkMode ? 'none' : 'block'
                        }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="clamp(14px, 3vw, 20px)" 
                          height="clamp(14px, 3vw, 20px)" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-sun text-[#C5C8D2]"
                        >
                          <circle cx="12" cy="12" r="4"></circle>
                          <path d="M12 2v2"></path>
                          <path d="M12 20v2"></path>
                          <path d="m4.93 4.93 1.41 1.41"></path>
                          <path d="m17.66 17.66 1.41 1.41"></path>
                          <path d="M2 12h2"></path>
                          <path d="M20 12h2"></path>
                          <path d="m6.34 17.66-1.41 1.41"></path>
                          <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                      </motion.div>
                      
                      {/* Moon Icon (Dark Mode) */}
                      <motion.div
                        animate={{
                          opacity: isDarkMode ? 1 : 0,
                          scale: isDarkMode ? 1 : 0.8,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                        style={{
                          display: isDarkMode ? 'block' : 'none'
                        }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="clamp(12px, 2.5vw, 15px)" 
                          height="clamp(12px, 2.5vw, 15px)" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          style={{
                            color: isDarkMode ? '#242835' : '#C5C8D2'
                          }}
                        >
                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                      </motion.div>
                      </div>
                    </div>
                    
                    {/* Light Indicator Circle (Fixed on Top Right) */}
                    <div className="absolute right-1 sm:right-2 top-1 sm:top-2 m-1 sm:m-2 flex items-center justify-center rounded-full bg-gradient-to-b from-[#2D313C] to-[#9B9EA6]" style={{ width: 'clamp(20px, 4vw, 32px)', height: 'clamp(20px, 4vw, 32px)' }}>
                      <div className="flex items-center justify-center rounded-full bg-gradient-to-b from-[#21242D] to-[#5E626D]" style={{ width: 'clamp(16px, 3vw, 24px)', height: 'clamp(16px, 3vw, 24px)' }}>
                        <div className="relative rounded-full border border-[#353535] bg-gradient-radial from-[#939393] to-[#606060]" style={{ width: 'clamp(12px, 2.5vw, 16px)', height: 'clamp(12px, 2.5vw, 16px)' }}>
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FFFFFE] to-[#B6B6B6]/0" style={{ width: 'clamp(8px, 1.5vw, 12px)', height: 'clamp(8px, 1.5vw, 12px)' }}></div>
                          <motion.div 
                            className="rounded-full bg-yellow-300 blur-[1px] transition-opacity duration-300"
                            style={{ width: 'clamp(8px, 1.5vw, 16px)', height: 'clamp(8px, 1.5vw, 16px)' }}
                            animate={{
                              opacity: isDarkMode ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeInOut"
                            }}
                          ></motion.div>
                          <motion.div 
                            className="absolute rounded-full bg-yellow-300 blur-[10px] transition-opacity duration-300"
                            style={{ width: 'clamp(8px, 1.5vw, 16px)', height: 'clamp(8px, 1.5vw, 16px)' }}
                            animate={{
                              opacity: isDarkMode ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeInOut"
                            }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <span style={{ 
                fontWeight: '500'
              }}>designer<span style={{ fontFamily: 'Arial, sans-serif', fontWeight: '500', fontSize: '1.1em', transform: 'scaleX(0.8)', marginLeft: '-12px' }}>,</span></span> 
            </div>

                                                                                                                                                                                                                                                                                                                                                                                                       {/* Line 2: Web developer with X */}
                  <div className="flex items-center justify-center flex-wrap mb-[-0.5rem]">
               <span style={{ 
                 fontWeight: '500'
               }}>Web</span>
                                                             <div
                   className="inline-flex items-center justify-center mx-0 rounded-xl"
                   style={{
                     width: 'clamp(90px, 14vw, 180px)',
                     height: 'clamp(90px, 14vw, 180px)'
                   }}
                 >
                {/* Coding Lottie Animation */}
                <motion.div
                  ref={animationRef}
                  className="cursor-pointer"
                  style={{
                    width: 'clamp(85px, 13vw, 170px)',
                    height: 'clamp(85px, 13vw, 170px)'
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 }
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                >
                  <Lottie 
                    animationData={require('/public/animations/coding-animation.json')}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: '100%',
                      height: '100%',
                      filter: isDarkMode ? 'invert(0.9) hue-rotate(180deg) brightness(0.7)' : 'invert(0) hue-rotate(0deg) brightness(1.2)'
                    }}
                  />
                </motion.div>
              </div>
                             <span style={{ 
                               fontWeight: '500'
                             }}>engineer<span style={{ fontFamily: 'Arial, sans-serif', fontWeight: '500', fontSize: '1.1em', transform: 'scaleX(0.8)', marginLeft: '-12px' }}>,</span></span>
            </div>

            {/* Line 3: novice coder with work from home animation */}
            <div className="flex items-center justify-center flex-wrap">
              <span style={{ 
                fontWeight: '500'
              }}>novice coder</span>
              <div
                className="inline-flex items-center justify-center mx-0 rounded-xl"
                style={{
                  width: 'clamp(80px, 12vw, 160px)',
                  height: 'clamp(80px, 12vw, 160px)'
                }}
              >
                {/* Work from Home Lottie Animation */}
                <motion.div
                  className="cursor-pointer"
                  style={{
                    width: 'clamp(75px, 11vw, 150px)',
                    height: 'clamp(75px, 11vw, 150px)'
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Lottie 
                    animationData={require('/public/animations/work-from-home-animation.json')}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Tagline with PPEditorial font */}
                 <div className="mt-4 sm:mt-6 md:mt-5">
            <p
              className="font-editorial"
              style={{ 
                fontSize: 'clamp(2.00rem, 2.2vw, 3rem)',
                lineHeight: 'clamp(2.30rem, 2.6vw, 2.80rem)',
                color: '#3F3F46',
                fontWeight: '500',
                fontFamily: 'Editorial New, Caveat, Dancing Script, cursive',
                fontStyle: 'italic'
              }}
                   >
                     and generally curious.
                   </p>
                 </div>


        </div>
      </div>


    </section>
  )
}