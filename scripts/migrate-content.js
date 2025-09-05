import { createClient } from '@sanity/client'

// Load environment variables
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

// Sample blog posts data
const blogPosts = [
  {
    _type: 'post',
    title: 'Designing for Mobile-First: Lessons from WINZOI',
    slug: {
      _type: 'slug',
      current: 'designing-for-mobile-first-lessons-from-winzoi'
    },
    excerpt: 'Exploring the challenges and solutions in creating a mobile-first giveaway platform that serves millions of users.',
    publishedAt: '2024-03-15T00:00:00.000Z',
            categories: ['Mobile Design', 'UX'],
            body: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'This is a detailed case study about designing the WINZOI mobile application with a mobile-first approach.'
              }
            ]
          }
        ]
  },
  {
    _type: 'post',
    title: 'The Psychology of User Interface Design',
    slug: {
      _type: 'slug',
      current: 'the-psychology-of-user-interface-design'
    },
    excerpt: 'How understanding human psychology can lead to better user experiences and higher engagement rates.',
    publishedAt: '2024-02-28T00:00:00.000Z',
    categories: ['Psychology', 'UI Design'],
            body: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'Exploring the psychological principles that drive effective user interface design.'
              }
            ]
          }
        ]
  },
  {
    _type: 'post',
    title: 'Building Design Systems for Scale',
    slug: {
      _type: 'slug',
      current: 'building-design-systems-for-scale'
    },
    excerpt: 'My approach to creating scalable design systems that maintain consistency across large applications.',
    publishedAt: '2024-01-20T00:00:00.000Z',
    categories: ['Design Systems', 'Scalability'],
            body: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'A comprehensive guide to building and maintaining design systems for large-scale applications.'
              }
            ]
          }
        ]
  },
  {
    _type: 'post',
    title: 'From Figma to Reality: The WINZOI Journey',
    slug: {
      _type: 'slug',
      current: 'from-figma-to-reality-the-winzoi-journey'
    },
    excerpt: 'A detailed case study of how WINZOI evolved from initial concepts to a fully functional mobile application.',
    publishedAt: '2023-12-10T00:00:00.000Z',
    categories: ['Case Study', 'Development'],
            body: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'The complete journey from initial design concepts in Figma to a fully functional mobile application.'
              }
            ]
          }
        ]
  }
]

// Sample projects data
const projects = [
  {
    _type: 'project',
    title: 'WINZOI App',
    slug: {
      _type: 'slug',
      current: 'winzoi'
    },
    description: 'A fully designed iOS mobile application for an online giveaway platform with interactive prototypes.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    liveUrl: 'https://winzoi.com',
    featured: true,
    order: 1,
            body: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'A comprehensive case study of the WINZOI mobile application design and development process.'
              }
            ]
          }
        ]
  },
  {
    _type: 'project',
    title: 'Fit Flow',
    slug: {
      _type: 'slug',
      current: 'fit-flow'
    },
    description: 'Health app for iOS - currently in development.',
    technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
    liveUrl: 'https://fitflow.app',
    featured: true,
    order: 2,
            body: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'A health and fitness application designed to help users track their wellness journey.'
              }
            ]
          }
        ]
  }
]

// Sample categories data
const categories = [
  {
    _type: 'category',
    title: 'Mobile Design',
    slug: {
      _type: 'slug',
      current: 'mobile-design'
    }
  },
  {
    _type: 'category',
    title: 'UX',
    slug: {
      _type: 'slug',
      current: 'ux'
    }
  },
  {
    _type: 'category',
    title: 'Psychology',
    slug: {
      _type: 'slug',
      current: 'psychology'
    }
  },
  {
    _type: 'category',
    title: 'UI Design',
    slug: {
      _type: 'slug',
      current: 'ui-design'
    }
  },
  {
    _type: 'category',
    title: 'Design Systems',
    slug: {
      _type: 'slug',
      current: 'design-systems'
    }
  },
  {
    _type: 'category',
    title: 'Scalability',
    slug: {
      _type: 'slug',
      current: 'scalability'
    }
  },
  {
    _type: 'category',
    title: 'Case Study',
    slug: {
      _type: 'slug',
      current: 'case-study'
    }
  },
  {
    _type: 'category',
    title: 'Development',
    slug: {
      _type: 'slug',
      current: 'development'
    }
  }
]

async function migrateContent() {
  try {
    console.log('🚀 Starting content migration...')

    // First, create categories
    console.log('📝 Creating categories...')
    const createdCategories = []
    for (const category of categories) {
      try {
        const result = await client.create(category)
        createdCategories.push(result)
        console.log(`✅ Created category: ${category.title}`)
      } catch (error) {
        console.log(`⚠️ Category ${category.title} might already exist:`, error.message)
      }
    }

    // Create a map of category titles to their references
    const categoryMap = {}
    for (const category of createdCategories) {
      categoryMap[category.title] = {
        _type: 'reference',
        _ref: category._id
      }
    }

    // Create blog posts
    console.log('📝 Creating blog posts...')
    for (const post of blogPosts) {
      try {
        // Convert category names to references
        if (post.categories) {
          post.categories = post.categories.map(catName => categoryMap[catName]).filter(Boolean)
        }
        
        const result = await client.create(post)
        console.log(`✅ Created blog post: ${post.title}`)
      } catch (error) {
        console.log(`⚠️ Blog post ${post.title} might already exist:`, error.message)
      }
    }

    // Create projects
    console.log('📝 Creating projects...')
    for (const project of projects) {
      try {
        const result = await client.create(project)
        console.log(`✅ Created project: ${project.title}`)
      } catch (error) {
        console.log(`⚠️ Project ${project.title} might already exist:`, error.message)
      }
    }

    console.log('🎉 Content migration completed!')
    console.log('📊 Summary:')
    console.log(`   - Categories: ${createdCategories.length}`)
    console.log(`   - Blog Posts: ${blogPosts.length}`)
    console.log(`   - Projects: ${projects.length}`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run the migration
migrateContent()
