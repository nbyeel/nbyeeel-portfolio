'use client'

import { useEffect } from 'react'

export function Analytics() {
  useEffect(() => {
    // Only load analytics in production
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
      try {
        const script = document.createElement('script')
        script.defer = true
        script.setAttribute('data-domain', process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
        script.src = 'https://plausible.io/js/script.js'
        
        // Add error handling for script loading
        script.onerror = () => {
          console.warn('Analytics script failed to load')
        }
        
        document.head.appendChild(script)

        return () => {
          // Cleanup script on unmount
          const existingScript = document.querySelector(`script[data-domain="${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}"]`)
          if (existingScript) {
            existingScript.remove()
          }
        }
      } catch (error) {
        console.warn('Analytics setup failed:', error)
      }
    }
  }, [])

  // Return null to not render anything in the DOM
  return null
}
