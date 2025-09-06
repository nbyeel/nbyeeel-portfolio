'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface PageLoaderProps {
  children: React.ReactNode
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Handle page reload detection
    const handleLoad = () => {
      // Shorter delay for better scroll restoration
      setTimeout(() => {
        setIsLoading(false)
        
        // Emit custom event for scroll restoration
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('pageLoaderComplete'))
        }, 100)
        
        // After first load, subsequent loads are not "initial"
        setTimeout(() => {
          setIsInitialLoad(false)
        }, 50)
      }, 200) // Slightly increased for better coordination
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    // Also handle page visibility changes (when user comes back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden && isInitialLoad) {
        handleLoad()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isInitialLoad])

  return (
    <>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#18181B]"
        >
          <div className="text-center">
            <LoadingSpinner size="lg" text="Loading..." />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-zinc-500 dark:text-zinc-400"
            >
              Preparing your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 0 : 0.1 }}
        className={isLoading ? 'pointer-events-none' : ''}
      >
        {children}
      </motion.div>
    </>
  )
}
