'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Network error suppression
if (typeof window !== 'undefined') {
  // Suppress QUIC protocol errors
  const originalFetch = window.fetch
  window.fetch = function(...args) {
    const url = args[0]?.toString() || ''
    if (url.includes('api.sanity.io') && url.includes('ERR_QUIC_PROTOCOL_ERROR')) {
      console.warn('Suppressed QUIC protocol error for:', url)
      return Promise.reject(new Error('Network error suppressed'))
    }
    return originalFetch.apply(this, args)
  }

  // Suppress specific Sanity network errors and React prop warnings
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
      message.includes("Cannot read properties of undefined (reading 'call')") ||
      message.includes('Cannot read properties of undefined') ||
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
    
    // Check for network errors and WebSocket issues
    if (
      message.includes('ERR_QUIC_PROTOCOL_ERROR') ||
      message.includes('QUIC_PUBLIC_RESET') ||
      message.includes('network error') ||
      message.includes('TypeError: network error') ||
      message.includes('WebSocket connection to') ||
      message.includes('WebSocket is closed before the connection is established') ||
      message.includes('api.sanity.io') && message.includes('socket') ||
      message.includes('Failed to fetch version for package') ||
      message.includes('Failed to fetch') && message.includes('sanity')
    ) {
      // Suppress these specific errors
      return
    }
    
    originalConsoleError.apply(console, args)
  }

  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.toString() || ''
    if (
      message.includes('ERR_QUIC_PROTOCOL_ERROR') ||
      message.includes('QUIC_PUBLIC_RESET') ||
      message.includes('network error') ||
      message.includes('WebSocket connection to') ||
      message.includes('WebSocket is closed before the connection is established') ||
      message.includes('api.sanity.io') && message.includes('socket') ||
      message.includes('Failed to fetch version for package') ||
      message.includes('Failed to fetch') && message.includes('sanity')
    ) {
      event.preventDefault()
      console.warn('Suppressed unhandled promise rejection:', message)
    }
  })
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
