/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    // Disable image optimization errors for missing local images during development
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Reduce console noise in development
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Completely remove CSP for development
  // async headers() {
  //   return [];
  // },
}

module.exports = nextConfig
