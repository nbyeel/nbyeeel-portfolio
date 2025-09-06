'use client'

import { useEffect } from 'react'

export function ScrollRestoration() {
  useEffect(() => {
    // Always scroll to top on page load/reload
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Clear any saved scroll positions
    const clearScrollData = () => {
      sessionStorage.removeItem('scrollPosition')
      sessionStorage.removeItem('scrollPath')
      sessionStorage.removeItem('hasScrolled')
      sessionStorage.removeItem('scrollTimestamp')
    }

    // Handle page load
    if (document.readyState === 'complete') {
      clearScrollData()
      scrollToTop()
    } else {
      window.addEventListener('load', () => {
        clearScrollData()
        scrollToTop()
      })
    }

    // Listen for custom event from page loader
    const handlePageLoaderComplete = () => {
      clearScrollData()
      scrollToTop()
    }
    
    window.addEventListener('pageLoaderComplete', handlePageLoaderComplete)

    // Cleanup
    return () => {
      window.removeEventListener('load', scrollToTop)
      window.removeEventListener('pageLoaderComplete', handlePageLoaderComplete)
    }
  }, [])

  return null
}
