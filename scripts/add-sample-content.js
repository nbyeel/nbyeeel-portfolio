const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-08-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Sample project data
const sampleProject = {
  _type: 'project',
  title: 'WINZOI App',
  slug: {
    _type: 'slug',
    current: 'winzoi'
  },
  description: 'A fully designed iOS mobile application for an online giveaway platform with interactive prototypes.',
  featured: true,
  order: 1
}

// Sample blog post data with all new fields
const samplePost = {
  _type: 'post',
  title: 'Why Every Designer Needs a Portfolio Website and How I Built Mine',
  slug: {
    _type: 'slug',
    current: 'why-every-designer-needs-a-portfolio-website-and-how-i-built-mine'
  },
  excerpt: 'In today\'s digital age, having a portfolio website is not just a nice-to-have—it\'s essential for any designer looking to showcase their work and attract opportunities.',
  publishedAt: new Date().toISOString(),
  featured: true,
  introduction: 'As a designer, your portfolio is your digital business card. It\'s the first impression potential clients and employers have of your work. In this article, I\'ll share why having a portfolio website is crucial and walk you through how I built mine using modern web technologies.',
  mainBody: [
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'The Importance of a Portfolio Website'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'A portfolio website serves multiple purposes in a designer\'s career. It\'s not just about showcasing your work—it\'s about telling your story, demonstrating your process, and making it easy for people to find and contact you.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: 'Professional Credibility'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Having a well-designed portfolio website immediately establishes your professional credibility. It shows that you understand design principles, user experience, and modern web technologies. When potential clients or employers visit your site, they\'re not just looking at your work—they\'re evaluating your ability to create digital experiences.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h3',
      children: [
        {
          _type: 'span',
          text: '24/7 Accessibility'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Unlike physical portfolios or PDF files, a website is always accessible. Anyone can view your work at any time, from anywhere in the world. This global reach opens up opportunities you might never have considered.'
        }
      ]
    },
    {
      _type: 'block',
      style: 'h2',
      children: [
        {
          _type: 'span',
          text: 'How I Built My Portfolio'
        }
      ]
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'I chose to build my portfolio using Next.js, Sanity CMS, and Tailwind CSS. This stack allowed me to create a fast, SEO-friendly website with a powerful content management system.'
        }
      ]
    }
  ],
  conclusion: 'Building a portfolio website is an investment in your career. It\'s a project that showcases not just your design work, but your technical skills and attention to detail. The process of creating my portfolio taught me valuable lessons about web development, content strategy, and user experience design.',
  callToAction: {
    title: 'Ready to Build Your Portfolio?',
    description: 'Start your journey towards a professional online presence today. Whether you\'re a designer, developer, or creative professional, a portfolio website is your gateway to new opportunities.',
    buttonText: 'Get Started',
    buttonUrl: '/contact',
    buttonStyle: 'primary'
  },
  author: {
    name: 'Nabeel Ahmed',
    bio: 'A passionate designer and developer who loves creating beautiful, functional digital experiences. When not designing, you can find me exploring new technologies and sharing knowledge with the community.',
    socialLinks: {
      twitter: 'https://twitter.com/nabeel',
      linkedin: 'https://linkedin.com/in/nabeel'
    }
  },
  tags: ['design', 'portfolio', 'web-development', 'ux-design']
}

async function addSampleContent() {
  try {
    console.log('🚀 Adding sample content to Sanity...')
    
    // Add sample project
    const project = await client.create(sampleProject)
    console.log('✅ Added project:', project.title)
    
    // Add sample blog post
    const post = await client.create(samplePost)
    console.log('✅ Added blog post:', post.title)
    console.log('📝 Blog post slug:', post.slug.current)
    
    console.log('🎉 Sample content added successfully!')
    console.log('📝 You can now view this content in your portfolio website')
    console.log('🌐 Visit: http://localhost:3000/posts/article/why-every-designer-needs-a-portfolio-website-and-how-i-built-mine')
    
  } catch (error) {
    console.error('❌ Error adding sample content:', error.message)
    if (error.message.includes('permission')) {
      console.log('💡 Tip: Make sure you have the correct SANITY_API_TOKEN with write permissions')
    }
  }
}

// Run the function
addSampleContent()
