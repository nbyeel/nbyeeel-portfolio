// Script to add sample headings and descriptions to existing project screenshots
// Run this in your Sanity Studio to populate existing projects with sample content

import { client } from '../src/lib/sanity'

const sampleContent = {
  'landscape': {
    heading: 'Development',
    description: 'The development phase was equally important. Since I wanted flexibility and scalability, I built the site using Next.js and styled it with Tailwind CSS. This gave me complete control over responsiveness and allowed me to fine tune micro interactions, like hover effects and transitions. These small details added polish and helped the site feel alive.'
  },
  'portrait': {
    heading: 'Mobile Experience',
    description: 'Ensuring the mobile experience was just as polished as desktop was crucial. I focused on touch-friendly interactions and optimized layouts for smaller screens.'
  },
  'square': {
    heading: 'Design System',
    description: 'I established a consistent design system with reusable components, ensuring visual harmony across all pages and maintaining brand consistency.'
  }
}

async function updateProjectScreenshots() {
  try {
    // Get all projects
    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        screenshots
      }
    `)

    console.log(`Found ${projects.length} projects to update`)

    for (const project of projects) {
      if (project.screenshots && project.screenshots.length > 0) {
        console.log(`\nUpdating project: ${project.title}`)
        
        const updatedScreenshots = project.screenshots.map((screenshot, index) => {
          // Only add content if it doesn't already exist
          if (!screenshot.heading && !screenshot.description) {
            const orientation = screenshot.orientation || 'landscape'
            const content = sampleContent[orientation] || sampleContent.landscape
            
            return {
              ...screenshot,
              heading: content.heading,
              description: content.description
            }
          }
          return screenshot
        })

        // Update the project
        await client
          .patch(project._id)
          .set({ screenshots: updatedScreenshots })
          .commit()

        console.log(`✅ Updated ${project.title} with ${updatedScreenshots.length} screenshots`)
      }
    }

    console.log('\n🎉 All projects updated successfully!')
  } catch (error) {
    console.error('❌ Error updating projects:', error)
  }
}

// Run the script
updateProjectScreenshots()
