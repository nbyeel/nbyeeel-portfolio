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
        
        // Multiple attempts with different strategies
        let attempts = 0
        const maxAttempts = 20
        
        const restoreScroll = () => {
          attempts++
          
          // Check if content is fully loaded
          const heroSection = document.querySelector('section')
          const projectsSection = document.getElementById('projects')
          const blogSection = document.getElementById('blog')
          const aboutSection = document.getElementById('about')
          const careerSection = document.getElementById('career')
          
          // More comprehensive content check
          const hasContent = document.body.scrollHeight > window.innerHeight * 2
          const hasSections = heroSection && (projectsSection || blogSection || aboutSection || careerSection)
          const isContentReady = hasContent && hasSections
          
          if (isContentReady) {
            // Force immediate scroll restoration
            window.scrollTo(0, scrollY)
            
            // Multiple fallback methods for stubborn browsers
            setTimeout(() => {
              window.scrollTo({
                top: scrollY,
                behavior: 'auto'
              })
            }, 5)
            
            setTimeout(() => {
              document.documentElement.scrollTop = scrollY
              document.body.scrollTop = scrollY
            }, 10)
            
            setTimeout(() => {
              // Final fallback - direct property setting
              if (document.documentElement.scrollTop !== scrollY) {
                document.documentElement.scrollTop = scrollY
              }
              if (document.body.scrollTop !== scrollY) {
                document.body.scrollTop = scrollY
              }
            }, 15)
            
            // Verify restoration was successful
            setTimeout(() => {
              const currentScroll = window.scrollY
              const isAccurate = Math.abs(currentScroll - scrollY) < 50 // Allow 50px tolerance
              
              if (isAccurate) {
                console.log('✅ Scroll restoration successful:', currentScroll, 'px (target:', scrollY, 'px)')
              } else {
                console.log('⚠️ Scroll restoration inaccurate:', currentScroll, 'px (target:', scrollY, 'px)')
                // Try one more time if inaccurate
                window.scrollTo(0, scrollY)
              }
            }, 25)
          } else if (attempts < maxAttempts) {
            // If content not ready, try again with increasing delay
            const delay = Math.min(50 + (attempts * 25), 300)
            setTimeout(restoreScroll, delay)
          } else {
            console.log('Scroll restoration failed after', maxAttempts, 'attempts')
            console.log('Content check - hasContent:', hasContent, 'hasSections:', hasSections)
            console.log('Body height:', document.body.scrollHeight, 'Window height:', window.innerHeight)
          }
        }
        
        // Start restoration after page loader finishes
        setTimeout(restoreScroll, 500)
      }
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      sessionStorage.setItem('scrollPath', pathname)
      sessionStorage.setItem('hasScrolled', 'true')
      sessionStorage.setItem('scrollTimestamp', Date.now().toString())
    }

    // Track scroll events with throttling
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString())
        sessionStorage.setItem('scrollPath', pathname)
        sessionStorage.setItem('hasScrolled', 'true')
        sessionStorage.setItem('scrollTimestamp', Date.now().toString())
      }, 50) // Reduced throttle for more accurate tracking
    }

    // Handle page load
    if (document.readyState === 'complete') {
      handleScrollRestoration()
    } else {
      window.addEventListener('load', handleScrollRestoration)
    }

    // Listen for custom event from page loader
    const handlePageLoaderComplete = () => {
      setTimeout(handleScrollRestoration, 100)
    }
    
    window.addEventListener('pageLoaderComplete', handlePageLoaderComplete)

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener('load', handleScrollRestoration)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pageLoaderComplete', handlePageLoaderComplete)
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
      sessionStorage.removeItem('scrollTimestamp')
    }
  }, [pathname])

  return null
}
