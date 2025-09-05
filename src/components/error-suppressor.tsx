'use client'

import { useEffect } from 'react'

export function ErrorSuppressor() {
  useEffect(() => {
    // Suppress QUIC protocol errors and network issues
    const suppressNetworkErrors = () => {
      // Suppress fetch errors
      const originalFetch = window.fetch
      window.fetch = function(...args) {
        const url = args[0]?.toString() || ''
        if (url.includes('api.sanity.io') && (
          url.includes('ERR_QUIC_PROTOCOL_ERROR') ||
          url.includes('QUIC_PUBLIC_RESET')
        )) {
          console.warn('Suppressed network error for:', url)
          return Promise.reject(new Error('Network error suppressed'))
        }
        
        // Temporarily disable video error suppression for debugging
        // if (url.includes('cdn.sanity.io') && (
        //   url.includes('.mp4') ||
        //   url.includes('.mov') ||
        //   url.includes('.webm')
        // )) {
        //   // Return a rejected promise that won't show in console
        //   return Promise.reject(new Error('Video not found (suppressed)'))
        // }
        
        return originalFetch.apply(this, args)
      }

      // Suppress console errors
      const originalConsoleError = console.error
      console.error = function(...args) {
        const message = args[0]?.toString() || ''
        const stack = args[1]?.toString() || ''
        
        // Check if this is a React prop warning about disableTransition, items, or isSelected
        if (
          message.includes('React does not recognize the `disableTransition` prop') ||
          message.includes('React does not recognize the `items` prop') ||
          message.includes('React does not recognize the `isSelected` prop') ||
          message.includes('disableTransition') ||
          message.includes('disabletransition') ||
          message.includes('isSelected') ||
          message.includes('isselected') ||
          message.includes('styled-components: it looks like an unknown prop') ||
          stack.includes('disableTransition') ||
          stack.includes('disabletransition') ||
          stack.includes('items') ||
          stack.includes('isSelected') ||
          stack.includes('isselected')
        ) {
          // Completely suppress these prop warnings
          return
        }
        
        // Suppress message channel errors (browser extensions)
        if (
          message.includes('message channel closed') ||
          message.includes('asynchronous response') ||
          message.includes('listener indicated') ||
          message.includes('sendResponse') ||
          message.includes('chrome.runtime') ||
          message.includes('grm ERROR') ||
          message.includes('iterable') ||
          message.includes('Grammarly')
        ) {
          // Suppress browser extension errors
          return
        }
        
        // Check for network errors and WebSocket issues
        if (
          message.includes('ERR_QUIC_PROTOCOL_ERROR') ||
          message.includes('QUIC_PUBLIC_RESET') ||
          message.includes('TypeError: network error') ||
          message.includes('Failed to load resource: net::ERR_QUIC_PROTOCOL_ERROR') ||
          message.includes('WebSocket connection to') ||
          message.includes('WebSocket is closed before the connection is established') ||
          message.includes('api.sanity.io') && message.includes('socket')
        ) {
          // Suppress these specific errors
          return
        }
        
        // Temporarily disable video error suppression for debugging
        // if (
        //   message.includes('404 (Not Found)') ||
        //   message.includes('net::ERR_ABORTED 404') ||
        //   (message.includes('cdn.sanity.io') && (
        //     message.includes('.mp4') ||
        //     message.includes('.mov') ||
        //     message.includes('.webm')
        //   ))
        // ) {
        //   return
        // }
        
        originalConsoleError.apply(console, args)
      }

      // Suppress unhandled promise rejections
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const message = event.reason?.toString() || ''
        if (
          message.includes('ERR_QUIC_PROTOCOL_ERROR') ||
          message.includes('QUIC_PUBLIC_RESET') ||
          message.includes('network error') ||
          message.includes('WebSocket connection to') ||
          message.includes('WebSocket is closed before the connection is established') ||
          message.includes('api.sanity.io') && message.includes('socket')
        ) {
          event.preventDefault()
          console.warn('Suppressed unhandled promise rejection:', message)
        }
      }

      window.addEventListener('unhandledrejection', handleUnhandledRejection)

      // Cleanup function
      return () => {
        window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      }
    }

    suppressNetworkErrors()
  }, [])

  return null
}
