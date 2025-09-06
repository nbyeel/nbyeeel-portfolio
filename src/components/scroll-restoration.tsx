'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Handle scroll restoration for page reloads
    const handleScrollRestoration = () => {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition')
      const savedPath = sessionStorage.getItem('scrollPath')
      
      // Only restore if we're on the same path and have a saved position
      if (savedScrollPosition && savedPath === pathname) {
        const scrollY = parseInt(savedScrollPosition, 10)
        
        // Wait for content to load, then restore position
        const restoreScroll = () => {
          // Check if key sections are loaded
          const heroSection = document.querySelector('section')
          const projectsSection = document.getElementById('projects')
          const blogSection = document.getElementById('blog')
          
          // Ensure we have content loaded and key sections exist
          if (document.body.scrollHeight > window.innerHeight && heroSection) {
            window.scrollTo({
              top: scrollY,
              behavior: 'auto' // Use 'auto' for immediate positioning
            })
            console.log('Scroll restored to:', scrollY, 'px')
          } else {
            // If content not ready, try again
            setTimeout(restoreScroll, 100)
          }
        }
        
        // Start restoration after page loader finishes
        setTimeout(restoreScroll, 400) // Increased to work with page loader
      }
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      sessionStorage.setItem('scrollPath', pathname)
      sessionStorage.setItem('hasScrolled', 'true')
    }

    // Track scroll events with throttling
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString())
        sessionStorage.setItem('scrollPath', pathname)
        sessionStorage.setItem('hasScrolled', 'true')
      }, 100) // Throttle to avoid excessive writes
    }

    // Handle page load
    if (document.readyState === 'complete') {
      handleScrollRestoration()
    } else {
      window.addEventListener('load', handleScrollRestoration)
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener('load', handleScrollRestoration)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  // Reset scroll tracking on route change (but not on reload)
  useEffect(() => {
    // Only clear if it's a navigation, not a reload
    const isReload = performance.navigation?.type === 1
    if (!isReload) {
      sessionStorage.removeItem('hasScrolled')
      sessionStorage.removeItem('scrollPosition')
      sessionStorage.removeItem('scrollPath')
    }
  }, [pathname])

  return null
}
