'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll to top after navigation
  useEffect(() => {
    if (shouldScrollToTop && pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setShouldScrollToTop(false)
    }
  }, [pathname, shouldScrollToTop])
  
  // Hide navigation on studio pages and live page
  if (pathname?.startsWith('/studio') || pathname === '/live') {
    return null
  }
  
  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return null
  }
  
  const isDarkMode = theme === 'dark'

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Function to scroll to hero section
  const scrollToHero = () => {
    // If we're not on the home page, navigate there first
    if (pathname !== '/') {
      setShouldScrollToTop(true)
      router.push('/')
      return
    }
    
    // If we're on the home page, scroll to the very top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Function to scroll to contact section (footer)
  const scrollToContact = () => {
    const contactSection = document.getElementById('footer')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  interface NavItem {
    href?: string
    label: string
    action?: () => void
  }

  const navItems: NavItem[] = [
    { label: 'Contact', action: scrollToContact },
    { label: 'Projects', action: scrollToProjects },
    { href: '/#blog', label: 'Blog' },
  ]

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-10 z-[99999] mx-auto flex max-w-fit items-center justify-center gap-4 space-x-4 rounded-[40px] border border-transparent bg-white/60 py-2 pl-2 pr-6 shadow-[0px_8px_12px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg dark:border-white/[0.1] dark:bg-neutral-800/60"
    >
      {/* Logo - exactly matching jineshb.me two-layer button structure */}
      <button 
        onClick={scrollToHero}
        aria-label="Home page"
        className="flex-shrink-0 relative mb-1 flex w-auto items-center justify-center rounded-[28px] bg-gradient-to-b from-emerald-300 to-emerald-500 px-8 py-6 text-xl font-medium tracking-tighter text-emerald-900 transition-all ease-in-out hover:from-emerald-200 hover:to-emerald-500"
      >
        {/* Shadow layer positioned behind and below the main button */}
        <span className="absolute bottom-[-6px] left-0 -z-10 size-full rounded-[30px] bg-emerald-600 transition-all duration-300 group-hover:bottom-[-5px]"></span>
        
        {/* Main button content with home icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-home"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </button>

      {/* Desktop Navigation - matching jineshb.me with SpaceMono font */}
      {navItems.map((item) => (
        item.href ? (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
          >
            <span className="block sm:hidden"></span>
            <span className="font-space-mono text-md hidden sm:block">{item.label}</span>
          </Link>
        ) : (
          <button
            key={item.label}
            onClick={item.action}
            className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300 cursor-pointer"
          >
            <span className="block sm:hidden"></span>
            <span className="font-space-mono text-md hidden sm:block">{item.label}</span>
          </button>
        )
      ))}

      {/* Live Indicator - matching jineshb.me exactly with SVG icon and SpaceMono font */}
      <div className="mx-auto flex w-auto items-center justify-center tracking-normal">
        <a 
          href="/live" 
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-emerald-500 bg-emerald-50 px-3 py-1 text-sm text-emerald-700 transition-colors hover:bg-emerald-400 dark:border-emerald-500 dark:bg-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-700"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-radio size-3 animate-pulse"
          >
            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
            <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
            <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
          </svg>
          <span className="inline-block min-w-fit">Live</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
      >
        {isOpen ? <X className="w-4 h-4 text-gray-300" /> : <Menu className="w-4 h-4 text-gray-300" />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
        >
          <div className="py-4 px-6 space-y-4">
            {navItems.map((item) => (
              item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.action) {
                      item.action()
                    }
                    setIsOpen(false)
                  }}
                  className="block text-gray-300 hover:text-white transition-colors text-sm font-medium w-full text-left"
                >
                  {item.label}
                </button>
              )
            ))}
            
            {/* Mobile Live Indicator */}
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-700/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
