'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()
  const isRestoringRef = useRef(false)
  const restorationTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Handle scroll restoration for page reloads
    const handleScrollRestoration = () => {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition')
      const savedPath = sessionStorage.getItem('scrollPath')
      const scrollTimestamp = sessionStorage.getItem('scrollTimestamp')
      
      // Only restore if we're on the same path, have a saved position, and it's recent (within 5 minutes)
      if (savedScrollPosition && savedPath === pathname && scrollTimestamp) {
        const scrollY = parseInt(savedScrollPosition, 10)
        const timestamp = parseInt(scrollTimestamp, 10)
        const isRecent = Date.now() - timestamp < 5 * 60 * 1000 // 5 minutes
        
        if (!isRecent) {
          // Clear old scroll data
          sessionStorage.removeItem('scrollPosition')
          sessionStorage.removeItem('scrollPath')
          sessionStorage.removeItem('scrollTimestamp')
          return
        }
        
        // Prevent multiple restoration attempts
        if (isRestoringRef.current) return
        isRestoringRef.current = true
        
        let attempts = 0
        const maxAttempts = 15
        
        const restoreScroll = () => {
          attempts++
          
          // Enhanced content readiness check
          const bodyHeight = document.body.scrollHeight
          const windowHeight = window.innerHeight
          const hasMinimumContent = bodyHeight > windowHeight * 1.5
          
          // Check for key sections
          const heroSection = document.querySelector('section')
          const projectsSection = document.getElementById('projects')
          const blogSection = document.getElementById('blog')
          const aboutSection = document.getElementById('about')
          const careerSection = document.getElementById('career')
          const footerSection = document.querySelector('footer')
          
          // More reliable content detection
          const hasSections = heroSection && (projectsSection || blogSection || aboutSection || careerSection || footerSection)
          const isContentReady = hasMinimumContent && hasSections
          
          // Additional check: ensure images and fonts are loaded
          const images = document.querySelectorAll('img')
          const imagesLoaded = Array.from(images).every(img => img.complete)
          
          if (isContentReady && imagesLoaded) {
            // Disable smooth scrolling temporarily
            const originalScrollBehavior = document.documentElement.style.scrollBehavior
            document.documentElement.style.scrollBehavior = 'auto'
            
            // Primary restoration method
            window.scrollTo(0, scrollY)
            
            // Immediate fallback for different browsers
            requestAnimationFrame(() => {
              document.documentElement.scrollTop = scrollY
              document.body.scrollTop = scrollY
              
              // Verify and correct if needed
              setTimeout(() => {
                const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
                const difference = Math.abs(currentScroll - scrollY)
                
                if (difference > 10) {
                  // Force scroll to exact position
                  window.scrollTo({
                    top: scrollY,
                    behavior: 'auto'
                  })
                  document.documentElement.scrollTop = scrollY
                  document.body.scrollTop = scrollY
                }
                
                // Re-enable smooth scrolling
                document.documentElement.style.scrollBehavior = originalScrollBehavior
                
                // Final verification
                setTimeout(() => {
                  const finalScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
                  const isAccurate = Math.abs(finalScroll - scrollY) < 20
                  
                  if (isAccurate) {
                    console.log('✅ Scroll restoration successful:', finalScroll, 'px (target:', scrollY, 'px)')
                  } else {
                    console.log('⚠️ Scroll restoration inaccurate:', finalScroll, 'px (target:', scrollY, 'px)')
                  }
                  
                  isRestoringRef.current = false
                }, 50)
              }, 20)
            })
          } else if (attempts < maxAttempts) {
            // Progressive delay strategy
            const baseDelay = 100
            const progressiveDelay = Math.min(baseDelay + (attempts * 50), 500)
            restorationTimeoutRef.current = setTimeout(restoreScroll, progressiveDelay)
          } else {
            console.log('Scroll restoration failed after', maxAttempts, 'attempts')
            console.log('Content check - hasMinimumContent:', hasMinimumContent, 'hasSections:', hasSections, 'imagesLoaded:', imagesLoaded)
            console.log('Body height:', bodyHeight, 'Window height:', windowHeight)
            isRestoringRef.current = false
          }
        }
        
        // Start restoration with initial delay
        restorationTimeoutRef.current = setTimeout(restoreScroll, 100)
      }
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      sessionStorage.setItem('scrollPosition', currentScrollY.toString())
      sessionStorage.setItem('scrollPath', pathname)
      sessionStorage.setItem('hasScrolled', 'true')
      sessionStorage.setItem('scrollTimestamp', Date.now().toString())
    }

    // Track scroll events with improved throttling
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      // Don't save scroll position during restoration
      if (isRestoringRef.current) return
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
        sessionStorage.setItem('scrollPosition', currentScrollY.toString())
        sessionStorage.setItem('scrollPath', pathname)
        sessionStorage.setItem('hasScrolled', 'true')
        sessionStorage.setItem('scrollTimestamp', Date.now().toString())
      }, 100) // Slightly increased throttle for better performance
    }

    // Enhanced page load detection
    const initializeScrollRestoration = () => {
      // Clear any existing restoration timeout
      if (restorationTimeoutRef.current) {
        clearTimeout(restorationTimeoutRef.current)
      }
      
      // Start restoration process
      handleScrollRestoration()
    }

    // Handle page load with multiple strategies
    if (document.readyState === 'complete') {
      // Page is already loaded
      setTimeout(initializeScrollRestoration, 50)
    } else {
      // Wait for page to load
      window.addEventListener('load', initializeScrollRestoration)
    }

    // Listen for custom event from page loader
    const handlePageLoaderComplete = () => {
      // Small delay to ensure page loader has fully completed
      setTimeout(initializeScrollRestoration, 50)
    }
    
    window.addEventListener('pageLoaderComplete', handlePageLoaderComplete)

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      clearTimeout(scrollTimeout)
      if (restorationTimeoutRef.current) {
        clearTimeout(restorationTimeoutRef.current)
      }
      window.removeEventListener('load', initializeScrollRestoration)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pageLoaderComplete', handlePageLoaderComplete)
    }
  }, [pathname])

  // Reset scroll tracking on route change (but not on reload)
  useEffect(() => {
    // Only clear if it's a navigation, not a reload
    const isReload = performance.navigation?.type === 1 || 
                     (typeof window !== 'undefined' && window.performance?.getEntriesByType('navigation')[0]?.type === 'reload')
    
    if (!isReload) {
      sessionStorage.removeItem('hasScrolled')
      sessionStorage.removeItem('scrollPosition')
      sessionStorage.removeItem('scrollPath')
      sessionStorage.removeItem('scrollTimestamp')
    }
  }, [pathname])

  return null
}
