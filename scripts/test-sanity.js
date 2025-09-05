const { createClient } = require('@sanity/client')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: '.env.local' })

// Test Sanity connection
async function testSanityConnection() {
  console.log('🔍 Testing Sanity connection...')
  
  // Check environment variables
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.SANITY_API_TOKEN
  
  console.log('📋 Environment variables:')
  console.log(`   Project ID: ${projectId ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Dataset: ${dataset ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Token: ${token ? '✅ Set' : '❌ Missing'}`)
  
  if (!projectId || !dataset) {
    console.error('❌ Missing required environment variables')
    return false
  }
  
  // Create client
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-08-01',
    useCdn: false,
    token,
    perspective: 'published',
    stega: false,
    requestTimeout: 10000,
    retry: {
      retries: 2,
      factor: 1.5,
      minTimeout: 500,
      maxTimeout: 5000,
    },
    withCredentials: false,
  })
  
  try {
    console.log('🔄 Testing connection...')
    
    // Simple test query
    const testQuery = `*[_type == "post" || _type == "project"] | order(_createdAt desc)[0...1] {
      _id,
      _type,
      title
    }`
    
    const result = await client.fetch(testQuery)
    console.log('✅ Connection successful!')
    console.log('📦 Test result:', result)
    
    // Test content types
    console.log('🔍 Testing content types...')
    
    const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc)[0...3]`)
    console.log(`📝 Found ${posts.length} blog posts`)
    
    const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)[0...3]`)
    console.log(`🎨 Found ${projects.length} projects`)
    
    const categories = await client.fetch(`*[_type == "category"] | order(_createdAt desc)[0...3]`)
    console.log(`🏷️ Found ${categories.length} categories`)
    
    return true
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('🔍 Error details:', error)
    return false
  }
}

// Run the test
testSanityConnection()
  .then(success => {
    if (success) {
      console.log('🎉 All tests passed!')
      process.exit(0)
    } else {
      console.log('💥 Tests failed!')
      process.exit(1)
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error)
    process.exit(1)
  })
