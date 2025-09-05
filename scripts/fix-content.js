import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function fixExistingContent() {
  try {
    console.log('🔧 Starting to fix existing content...')

    // Fix blog posts
    console.log('📝 Fixing blog posts...')
    const posts = await client.fetch('*[_type == "post"]')
    
    for (const post of posts) {
      try {
        // Fix body content with proper keys
        if (post.body && Array.isArray(post.body)) {
          post.body = post.body.map((block, index) => ({
            ...block,
            _key: block._key || `block-${index}`,
            children: block.children?.map((child, childIndex) => ({
              ...child,
              _key: child._key || `child-${index}-${childIndex}`
            })) || []
          }))
        }

        // Fix categories - convert string array to proper references
        if (post.categories && Array.isArray(post.categories) && typeof post.categories[0] === 'string') {
          const categoryRefs = []
          for (const catName of post.categories) {
            const category = await client.fetch(`*[_type == "category" && title == $catName][0]`, { catName })
            if (category) {
              categoryRefs.push({
                _type: 'reference',
                _ref: category._id
              })
            }
          }
          post.categories = categoryRefs
        }

        // Update the post
        await client.patch(post._id).set(post).commit()
        console.log(`✅ Fixed blog post: ${post.title}`)
      } catch (error) {
        console.log(`⚠️ Error fixing blog post ${post.title}:`, error.message)
      }
    }

    // Fix projects
    console.log('📝 Fixing projects...')
    const projects = await client.fetch('*[_type == "project"]')
    
    for (const project of projects) {
      try {
        // Fix body content with proper keys
        if (project.body && Array.isArray(project.body)) {
          project.body = project.body.map((block, index) => ({
            ...block,
            _key: block._key || `block-${index}`,
            children: block.children?.map((child, childIndex) => ({
              ...child,
              _key: child._key || `child-${index}-${childIndex}`
            })) || []
          }))
        }

        // Fix screenshots array with proper keys
        if (project.screenshots && Array.isArray(project.screenshots)) {
          project.screenshots = project.screenshots.map((screenshot, index) => ({
            ...screenshot,
            _key: screenshot._key || `screenshot-${index}`
          }))
        }

        // Update the project
        await client.patch(project._id).set(project).commit()
        console.log(`✅ Fixed project: ${project.title}`)
      } catch (error) {
        console.log(`⚠️ Error fixing project ${project.title}:`, error.message)
      }
    }

    console.log('🎉 Content fixing completed!')

  } catch (error) {
    console.error('❌ Fixing failed:', error)
  }
}

// Run the fix
fixExistingContent()
