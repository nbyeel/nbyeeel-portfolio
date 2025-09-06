'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Handle scroll restoration for page reloads
    const handleScrollRestoration = () => {
      // Only restore scroll position if it's not the initial load
      if (sessionStorage.getItem('hasScrolled') === 'true') {
        const savedScrollPosition = sessionStorage.getItem('scrollPosition')
        if (savedScrollPosition) {
          const scrollY = parseInt(savedScrollPosition, 10)
          // Smooth scroll to saved position after a short delay
          setTimeout(() => {
            window.scrollTo({
              top: scrollY,
              behavior: 'smooth'
            })
          }, 100)
        }
      }
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      sessionStorage.setItem('hasScrolled', 'true')
    }

    // Track scroll events
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      sessionStorage.setItem('hasScrolled', 'true')
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
      window.removeEventListener('load', handleScrollRestoration)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  // Reset scroll tracking on route change
  useEffect(() => {
    sessionStorage.removeItem('hasScrolled')
    sessionStorage.removeItem('scrollPosition')
  }, [pathname])

  return null
}
