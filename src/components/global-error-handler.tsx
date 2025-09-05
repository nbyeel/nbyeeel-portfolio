'use client'

import { useEffect } from 'react'

export function GlobalErrorHandler() {
  useEffect(() => {
    // Global error handler to suppress message channel errors
    const handleError = (event: ErrorEvent) => {
      const message = event.message || ''
      const error = event.error || ''
      
              // Check if this is a message channel error or browser extension error
        const isMessageChannelError =
          message.includes('message channel closed') ||
          message.includes('asynchronous response') ||
          message.includes('listener indicated') ||
          message.includes('sendResponse') ||
          message.includes('chrome.runtime') ||
          message.includes('grm ERROR') ||
          message.includes('iterable') ||
          message.includes('Grammarly') ||
          message.includes('Uncaught (in promise)') ||
          error?.toString().includes('message channel')
      
      if (isMessageChannelError) {
        event.preventDefault()
        return false
      }
    }

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason || ''
      const message = reason.toString()
      
      // Check if this is a message channel error or browser extension error
      const isMessageChannelError = 
        message.includes('message channel closed') ||
        message.includes('asynchronous response') ||
        message.includes('listener indicated') ||
        message.includes('sendResponse') ||
        message.includes('chrome.runtime') ||
        message.includes('grm ERROR') ||
        message.includes('iterable') ||
        message.includes('Grammarly')
      
      if (isMessageChannelError) {
        event.preventDefault()
        return false
      }
    }

    // Add event listeners
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}
