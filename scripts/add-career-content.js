const { createClient } = require('@sanity/client')

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env.local
  useCdn: false,
  apiVersion: '2023-05-03',
})

const careerData = [
  {
    _type: 'career',
    role: 'Senior UI/UX Designer & Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Leading comprehensive digital transformation projects for diverse clients across mobile apps, web applications, and landing pages. Specializing in end-to-end design solutions that drive user engagement and business growth, with expertise spanning iOS, Android, and web platforms.',
    order: 1,
    isCurrent: true
  },
  {
    _type: 'career',
    role: 'Senior UI/UX Designer & Developer',
    company: 'Team Relliks Systems',
    period: '2021 - 2023',
    description: 'Evolved from junior designer to senior leadership, managing complete design-to-development workflows. Led cross-functional teams in creating scalable enterprise solutions, demonstrating exceptional growth in both design expertise and technical implementation capabilities.',
    order: 2,
    isCurrent: false
  },
  {
    _type: 'career',
    role: 'Junior UI/UX Designer',
    company: 'Team Relliks Systems',
    period: '2020 - 2021',
    description: 'Started my professional journey in product design, rapidly mastering user-centered design principles and establishing a foundation in creating intuitive digital experiences for complex business applications.',
    order: 3,
    isCurrent: false
  }
]

async function addCareerContent() {
  try {
    console.log('🚀 Adding career content to Sanity...')
    
    // Create career entries
    const createdCareer = []
    for (const career of careerData) {
      const result = await client.create(career)
      createdCareer.push(result)
      console.log(`✅ Created career: ${career.role} at ${career.company}`)
    }
    
    console.log('🎉 Successfully added all career content!')
    console.log('📊 Created career entries:', createdCareer.length)
    
  } catch (error) {
    console.error('❌ Error adding career content:', error)
  }
}

// Run the script
addCareerContent()
