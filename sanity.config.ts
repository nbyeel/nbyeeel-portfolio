import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/studio',
  
  apiVersion: '2023-08-01',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema,
  
  // Enhanced CORS configuration to prevent network errors
  cors: {
    credentials: false,
    origin: ['http://localhost:3000', 'http://localhost:3333']
  },

  // Configure server with better timeout settings
  server: {
    port: 3333,
    hostname: 'localhost'
  },

  // Add request timeout configuration
  requestTimeout: 10000,
})
