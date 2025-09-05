import { client, safeFetch } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { DynamicCaseStudy } from '@/components/case-studies/dynamic-case-study'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  shortInfo?: string
  mainImage?: {
    image: any;
    orientation: 'portrait' | 'landscape' | 'square';
    alt?: string;
  }
  screenshots?: Array<{ 
    mediaType: 'image' | 'video';
    image?: any; 
    video?: any;
    orientation: 'portrait' | 'landscape' | 'square'; 
    alt?: string;
    heading?: string;
    description?: any[]; // Rich text array
  }>
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  projectType?: {
    type: string;
    customText?: string;
  }
  role?: {
    type: string;
    customText?: string;
  }
  category?: {
    type: string;
    customText?: string;
  }
  projectOverview?: {
    challenge: string;
    solution: string;
  }
  designProcess?: Array<{
    title: string;
    icon: {
      type: 'upload' | 'predefined' | 'custom';
      uploadedIcon?: any;
      predefinedIcon?: string;
      customEmoji?: string;
    };
    description: string;
  }>
  resultsAndImpact?: {
    userExperience: {
      description: string;
      bulletPoints: string[];
    };
    technicalExcellence: {
      description: string;
      bulletPoints: string[];
    };
  }
  body?: any[]
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    // Try to find project by slug first with all fields
    let project: Project = await safeFetch(`
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        shortInfo,
        mainImage {
          image,
          orientation,
          alt
        },
        screenshots[] {
          mediaType,
          image,
          video,
          orientation,
          alt,
          heading,
          description
        },
        technologies,
        liveUrl,
        githubUrl,
        featured,
        projectType {
          type,
          customText
        },
        role {
          type,
          customText
        },
        category {
          type,
          customText
        },
        projectOverview {
          challenge,
          solution
        },
        designProcess[] {
          title,
          icon {
            type,
            uploadedIcon,
            predefinedIcon,
            customEmoji
          },
          description
        },
        resultsAndImpact {
          userExperience {
            description,
            bulletPoints
          },
          technicalExcellence {
            description,
            bulletPoints
          }
        },
        body
      }
    `, null, { slug })
    
    // If not found by slug, try to find by title (fallback for new projects)
    if (!project) {
      project = await safeFetch(`
        *[_type == "project" && title match $slug][0] {
          _id,
          title,
          slug,
          description,
          shortInfo,
          mainImage {
            image,
            orientation,
            alt
          },
          screenshots[] {
            mediaType,
            image,
            video,
            orientation,
            alt
          },
          technologies,
          liveUrl,
          githubUrl,
          featured,
          projectType {
            type,
            customText
          },
          role {
            type,
            customText
          },
          category {
            type,
            customText
          },
          projectOverview {
            challenge,
            solution
          },
          designProcess[] {
            title,
            icon {
              type,
              uploadedIcon,
              predefinedIcon,
              customEmoji
            },
            description
          },
          resultsAndImpact {
            userExperience {
              description,
              bulletPoints
            },
            technicalExcellence {
              description,
              bulletPoints
            }
          },
          body
        }
      `, null, { slug })
    }
    
    if (!project) {
      notFound()
    }

    // Debug: Log the project data to see what's being fetched
    console.log('Fetched project data:', JSON.stringify(project, null, 2))

    return (
      <main className="min-h-screen pt-20">
        <DynamicCaseStudy project={project} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }
}
