# 🎨 Setting Up Sanity CMS for Your Portfolio

## What is Sanity CMS?

Sanity is a **headless CMS** (Content Management System) that allows you to:
- **Manage content** without touching code
- **Update blog posts** and projects easily
- **Add new content** through a visual interface
- **Optimize for SEO** with structured content

## 🚀 Quick Setup Guide

### 1. Create Sanity Account
1. Go to [sanity.io](https://sanity.io)
2. Sign up for a free account
3. Create a new project

### 2. Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### 3. Initialize Sanity Studio
```bash
# In your frontend directory
npx sanity@latest init --template clean --create-project "Your Portfolio" --dataset production
```

### 4. Configure Environment Variables
Add these to your `.env.local` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### 5. Set Up Content Schemas

Create these files in your Sanity studio:

#### `schemas/post.js` (Blog Posts)
```javascript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
```

#### `schemas/project.js` (Projects)
```javascript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [{type: 'image'}]
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url'
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'body',
      title: 'Case Study Content',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    }
  },
}
```

### 6. Add Sample Content

#### Sample Blog Posts
1. **Title**: "Designing for Mobile-First: Lessons from WINZOI"
2. **Title**: "The Psychology of User Interface Design"
3. **Title**: "Building Design Systems for Scale"
4. **Title**: "From Figma to Reality: The WINZOI Journey"

#### Sample Projects
1. **Title**: "WINZOI"
2. **Title**: "Fit Flow"

### 7. Deploy Sanity Studio (Optional)
```bash
npx sanity@latest deploy
```

## 🔧 Configuration

### CORS Settings
In your Sanity project settings, add your domain to CORS origins:
- `http://localhost:3000` (development)
- `https://your-domain.vercel.app` (production)

### API Token
1. Go to your Sanity project settings
2. Create a new API token
3. Add it to your environment variables

## 📝 Content Management

### Adding Blog Posts
1. Open Sanity Studio
2. Go to "Blog Post" section
3. Click "Create new"
4. Fill in title, slug, excerpt, content
5. Publish

### Adding Projects
1. Open Sanity Studio
2. Go to "Project" section
3. Click "Create new"
4. Fill in project details
5. Upload images
6. Publish

## 🚀 Benefits

✅ **Easy Content Updates**: No code changes needed
✅ **Rich Text Editor**: WYSIWYG content creation
✅ **Image Management**: Built-in image optimization
✅ **SEO Friendly**: Structured content for better search
✅ **Real-time Updates**: Content changes reflect immediately
✅ **Version Control**: Track content changes over time

## 🔄 Fallback System

Your website includes a fallback system:
- If Sanity is not configured, it shows static content
- No errors or broken functionality
- Gradual migration possible

## 📊 Analytics Integration

Once Sanity is set up, you can track:
- Most popular blog posts
- Project engagement
- Content performance
- User behavior patterns

This setup gives you a professional, scalable content management system for your portfolio!
