import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to the live project',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'shortInfo',
      title: 'Short Info',
      type: 'text',
      rows: 2,
      description: 'Brief summary or tagline that appears under the project title (optional)',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Cover Image',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/jpeg, image/png, image/webp, image/gif',
          },
          validation: (Rule: any) => Rule.required().error('Cover image is required'),
          description: 'Upload the main cover image for this project',
        },
        {
          name: 'orientation',
          title: 'Cover Image Orientation',
          type: 'string',
          options: {
            list: [
              { title: 'Portrait (9:16)', value: 'portrait' },
              { title: 'Landscape (16:9)', value: 'landscape' },
              { title: 'Square (1:1)', value: 'square' },
            ],
            layout: 'radio',
          },
          initialValue: 'landscape',
          validation: (Rule: any) => Rule.required().error('Please select an orientation'),
          description: 'Choose how the cover image should be displayed. Landscape is recommended for project cards.',
        },
        {
          name: 'alt',
          title: 'Alt Text / Description',
          type: 'string',
          description: 'Description of the cover image for accessibility',
        },
      ],
      preview: {
        select: {
          media: 'image',
          title: 'alt',
          orientation: 'orientation',
        },
        prepare(selection: any) {
          const { media, title, orientation } = selection
          return {
            title: title || 'Cover Image',
            subtitle: orientation ? `${orientation.charAt(0).toUpperCase() + orientation.slice(1)}` : '',
            media: media,
          }
        },
      },
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'UI/UX Design', value: 'ui-ux-design' },
              { title: 'Web Development', value: 'web-development' },
              { title: 'Mobile Development', value: 'mobile-development' },
              { title: 'Brand Design', value: 'brand-design' },
              { title: 'Graphic Design', value: 'graphic-design' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'ui-ux-design',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'customText',
          title: 'Custom Project Type',
          type: 'string',
          hidden: ({ parent }: any) => parent?.type !== 'custom',
          validation: (Rule: any) => Rule.custom((value: any, context: any) => {
            if (context.parent?.type === 'custom' && !value) {
              return 'Custom text is required when "Custom" is selected'
            }
            return true
          }),
        },
      ],
      validation: (Rule: any) => Rule.required(),
      preview: {
        select: {
          type: 'type',
          customText: 'customText',
        },
        prepare(selection: any) {
          const { type, customText } = selection
          return {
            title: type === 'custom' ? customText : type?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          }
        },
      },
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Role Type',
          type: 'string',
          options: {
            list: [
              { title: 'Designer & Developer', value: 'designer-developer' },
              { title: 'UI/UX Designer', value: 'ui-ux-designer' },
              { title: 'Frontend Developer', value: 'frontend-developer' },
              { title: 'Full Stack Developer', value: 'full-stack-developer' },
              { title: 'Product Designer', value: 'product-designer' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'designer-developer',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'customText',
          title: 'Custom Role',
          type: 'string',
          hidden: ({ parent }: any) => parent?.type !== 'custom',
          validation: (Rule: any) => Rule.custom((value: any, context: any) => {
            if (context.parent?.type === 'custom' && !value) {
              return 'Custom text is required when "Custom" is selected'
            }
            return true
          }),
        },
      ],
      validation: (Rule: any) => Rule.required(),
      preview: {
        select: {
          type: 'type',
          customText: 'customText',
        },
        prepare(selection: any) {
          const { type, customText } = selection
          return {
            title: type === 'custom' ? customText : type?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          }
        },
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Category Type',
          type: 'string',
          options: {
            list: [
              { title: 'UI/UX Design', value: 'ui-ux-design' },
              { title: 'Web Development', value: 'web-development' },
              { title: 'Mobile App', value: 'mobile-app' },
              { title: 'Desktop/Website', value: 'desktop-website' },
              { title: 'Brand Identity', value: 'brand-identity' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'ui-ux-design',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'customText',
          title: 'Custom Category',
          type: 'string',
          hidden: ({ parent }: any) => parent?.type !== 'custom',
          validation: (Rule: any) => Rule.custom((value: any, context: any) => {
            if (context.parent?.type === 'custom' && !value) {
              return 'Custom text is required when "Custom" is selected'
            }
            return true
          }),
        },
      ],
      validation: (Rule: any) => Rule.required(),
      preview: {
        select: {
          type: 'type',
          customText: 'customText',
        },
        prepare(selection: any) {
          const { type, customText } = selection
          return {
            title: type === 'custom' ? customText : type?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          }
        },
      },
    }),
    defineField({
      name: 'projectOverview',
      title: 'Project Overview',
      type: 'object',
      fields: [
        {
          name: 'challenge',
          title: 'Challenge',
          type: 'text',
          rows: 4,
          description: 'Describe the main challenges and problems this project aimed to solve',
          validation: (Rule: any) => Rule.required().error('Please describe the project challenge'),
        },
        {
          name: 'solution',
          title: 'Solution',
          type: 'text',
          rows: 4,
          description: 'Explain how you approached and solved the challenges',
          validation: (Rule: any) => Rule.required().error('Please describe the project solution'),
        },
      ],
      options: {
        collapsible: false,
        collapsed: false,
      },
      preview: {
        select: {
          challenge: 'challenge',
          solution: 'solution',
        },
        prepare(selection: any) {
          const { challenge, solution } = selection
          const challengePreview = challenge ? challenge.substring(0, 100) + (challenge.length > 100 ? '...' : '') : 'No challenge described'
          const solutionPreview = solution ? solution.substring(0, 100) + (solution.length > 100 ? '...' : '') : 'No solution described'
          return {
            title: 'Project Overview',
            subtitle: `Challenge: ${challengePreview} | Solution: ${solutionPreview}`,
          }
        },
      },
    }),
    defineField({
      name: 'screenshots',
      title: 'Project Screenshots & Videos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'mediaType',
            title: 'Media Type',
            type: 'string',
            options: {
              list: [
                { title: 'Image', value: 'image' },
                { title: 'Video', value: 'video' },
              ],
              layout: 'radio',
            },
            initialValue: 'image',
            validation: (Rule: any) => Rule.required().error('Please select a media type'),
            description: 'Choose whether this is an image or video',
          },
          {
            name: 'image',
            title: 'Screenshot',
            type: 'image',
            options: {
              accept: 'image/jpeg, image/png, image/webp, image/gif',
            },
            hidden: ({ parent }: any) => parent?.mediaType !== 'image',
            validation: (Rule: any) => Rule.custom((value: any, context: any) => {
              if (context.parent?.mediaType === 'image' && !value) {
                return 'Image is required when media type is image'
              }
              return true
            }),
          },
          {
            name: 'video',
            title: 'Video File',
            type: 'file',
            options: {
              accept: 'video/mp4, video/webm, video/ogg, video/quicktime, video/x-msvideo, video/x-ms-wmv',
            },
            hidden: ({ parent }: any) => parent?.mediaType !== 'video',
            validation: (Rule: any) => Rule.custom((value: any, context: any) => {
              if (context.parent?.mediaType === 'video' && !value) {
                return 'Video is required when media type is video'
              }
              return true
            }),
          },
          {
            name: 'orientation',
            title: 'Media Orientation',
            type: 'string',
            options: {
              list: [
                { title: 'Portrait (9:16)', value: 'portrait' },
                { title: 'Landscape (16:9)', value: 'landscape' },
                { title: 'Square (1:1)', value: 'square' },
              ],
              layout: 'radio',
            },
            initialValue: 'portrait',
            validation: (Rule: any) => Rule.required().error('Please select an orientation'),
            description: 'Choose how this media should be displayed',
          },
          {
            name: 'alt',
            title: 'Alt Text / Description',
            type: 'string',
            description: 'Description of this media for accessibility',
          },
          {
            name: 'heading',
            title: 'Media Heading',
            type: 'string',
            description: 'Heading text to display above the media (especially useful for landscape images)',
          },
          {
            name: 'description',
            title: 'Media Description',
            type: 'array',
            of: [
              {
                type: 'block',
                styles: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'H1', value: 'h1' },
                  { title: 'H2', value: 'h2' },
                  { title: 'H3', value: 'h3' },
                  { title: 'H4', value: 'h4' },
                  { title: 'Quote', value: 'blockquote' },
                ],
                marks: {
                  decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Code', value: 'code' },
                    { title: 'Underline', value: 'underline' },
                    { title: 'Strike', value: 'strike-through' },
                  ],
                  annotations: [
                    {
                      name: 'link',
                      type: 'object',
                      title: 'Link',
                      fields: [
                        {
                          name: 'href',
                          type: 'url',
                          title: 'URL',
                        },
                        {
                          name: 'openInNewTab',
                          type: 'boolean',
                          title: 'Open in new tab',
                        },
                      ],
                    },
                  ],
                },
                lists: [
                  { title: 'Bullet', value: 'bullet' },
                  { title: 'Numbered', value: 'number' },
                ],
              },
            ],
            description: 'Rich text description with full formatting options (especially useful for landscape images)',
          },
        ],
        preview: {
          select: {
            media: 'image',
            mediaType: 'mediaType',
            title: 'alt',
            heading: 'heading',
            orientation: 'orientation',
          },
          prepare(selection: any) {
            const { media, mediaType, title, heading, orientation } = selection
            const displayTitle = heading || title || `${mediaType === 'video' ? 'Video' : 'Screenshot'}`
            return {
              title: displayTitle,
              subtitle: orientation ? `${orientation.charAt(0).toUpperCase() + orientation.slice(1)}` : '',
              media: mediaType === 'video' ? undefined : media,
            }
          },
        },
      }],
      description: 'Upload multiple screenshots and videos with individual orientation control',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the technologies used in this project',
    }),
    defineField({
      name: 'designProcess',
      title: 'Design Process',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Process Step Title',
            type: 'string',
            description: 'Enter the title for this design process step (e.g., Research, Wireframing, Prototyping, Testing, etc.)',
            validation: (Rule: any) => Rule.required().error('Please enter a title for this process step'),
          },
                     {
             name: 'icon',
             title: 'Icon',
             type: 'object',
             fields: [
               {
                 name: 'type',
                 title: 'Icon Type',
                 type: 'string',
                 options: {
                   list: [
                     { title: 'Upload Custom Icon', value: 'upload' },
                     { title: 'Predefined Icon', value: 'predefined' },
                     { title: 'Custom Emoji', value: 'custom' },
                   ],
                   layout: 'radio',
                 },
                 initialValue: 'upload',
                 description: 'Choose how you want to add an icon for this process step',
               },
               {
                 name: 'uploadedIcon',
                 title: 'Upload Icon',
                 type: 'image',
                 options: {
                   accept: 'image/svg+xml, image/png, image/jpeg, image/webp',
                   hotspot: false,
                 },
                 hidden: ({ parent }: any) => parent?.type !== 'upload',
                 description: 'Upload your own SVG, PNG, JPEG, or WebP icon. Recommended size: 64x64px or larger.',
                 validation: (Rule: any) => Rule.custom((value: any, context: any) => {
                   if (context.parent?.type === 'upload' && !value) {
                     return 'Please upload an icon'
                   }
                   return true
                 }),
               },
               {
                 name: 'predefinedIcon',
                 title: 'Select Predefined Icon',
                 type: 'string',
                 options: {
                   list: [
                     { title: '🔍 Magnifying Glass', value: 'search' },
                     { title: '💡 Lightbulb', value: 'lightbulb' },
                     { title: '📊 Chart', value: 'chart' },
                     { title: '📋 Clipboard', value: 'clipboard' },
                     { title: '🎯 Target', value: 'target' },
                     { title: '📈 Analytics', value: 'analytics' },
                     { title: '📝 Document', value: 'document' },
                     { title: '✏️ Pencil', value: 'pencil' },
                     { title: '📋 Wireframe', value: 'wireframe' },
                     { title: '🎨 Sketch', value: 'sketch' },
                     { title: '📐 Ruler', value: 'ruler' },
                     { title: '📱 Mobile', value: 'mobile' },
                     { title: '🖱️ Mouse', value: 'mouse' },
                     { title: '🎮 Controller', value: 'controller' },
                     { title: '📱 Phone', value: 'phone' },
                     { title: '💻 Computer', value: 'computer' },
                     { title: '🔗 Link', value: 'link' },
                     { title: '⚡ Lightning', value: 'lightning' },
                     { title: '🎨 Design', value: 'design' },
                     { title: '🔧 Development', value: 'development' },
                     { title: '🧪 Testing', value: 'testing' },
                     { title: '🚀 Launch', value: 'launch' },
                     { title: '📱 App', value: 'app' },
                     { title: '🌐 Web', value: 'web' },
                     { title: '🎯 Strategy', value: 'strategy' },
                     { title: '💬 Feedback', value: 'feedback' },
                     { title: '📊 Data', value: 'data' },
                     { title: '🎭 User Experience', value: 'ux' },
                     { title: '🎨 User Interface', value: 'ui' },
                   ],
                   layout: 'dropdown',
                 },
                 hidden: ({ parent }: any) => parent?.type !== 'predefined',
                 description: 'Choose from our curated collection of icons',
               },
               {
                 name: 'customEmoji',
                 title: 'Custom Emoji',
                 type: 'string',
                 hidden: ({ parent }: any) => parent?.type !== 'custom',
                 description: 'Enter any emoji you want (e.g., 🎨, 🚀, 💡, 📱, etc.)',
                 validation: (Rule: any) => Rule.custom((value: any, context: any) => {
                   if (context.parent?.type === 'custom' && !value) {
                     return 'Please enter a custom emoji'
                   }
                   return true
                 }),
               },
             ],
             validation: (Rule: any) => Rule.required().error('Please select or enter an icon'),
           },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Describe this design process step in detail',
            validation: (Rule: any) => Rule.required().error('Please describe this process step'),
          },
        ],
                 preview: {
           select: {
             title: 'title',
             iconType: 'icon.type',
             uploadedIcon: 'icon.uploadedIcon',
             predefinedIcon: 'icon.predefinedIcon',
             customEmoji: 'icon.customEmoji',
             description: 'description',
           },
           prepare(selection: any) {
             const { title, iconType, uploadedIcon, predefinedIcon, customEmoji, description } = selection
             const descriptionPreview = description ? description.substring(0, 60) + (description.length > 60 ? '...' : '') : 'No description'
             return {
               title: title || 'Untitled Step',
               subtitle: descriptionPreview,
               media: iconType === 'upload' ? uploadedIcon : undefined,
             }
           },
         },
      }],
             description: 'Add your design process steps. You can add as many or as few as you need.',
    }),
    defineField({
      name: 'resultsAndImpact',
      title: 'Results & Impact',
      type: 'object',
      fields: [
        {
          name: 'userExperience',
          title: 'User Experience',
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Describe the user experience achievements and impact',
              validation: (Rule: any) => Rule.required().error('Please describe the user experience impact'),
            },
            {
              name: 'bulletPoints',
              title: 'Key Achievements',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Add key user experience achievements (e.g., Intuitive navigation, Responsive design)',
              validation: (Rule: any) => Rule.required().min(1).error('Please add at least one achievement'),
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          preview: {
            select: {
              description: 'description',
              bulletPoints: 'bulletPoints',
            },
            prepare(selection: any) {
              const { description, bulletPoints } = selection
              const descriptionPreview = description ? description.substring(0, 60) + (description.length > 60 ? '...' : '') : 'No description'
              const bulletCount = bulletPoints ? bulletPoints.length : 0
              return {
                title: 'User Experience',
                subtitle: `${descriptionPreview} • ${bulletCount} achievements`,
              }
            },
          },
        },
        {
          name: 'technicalExcellence',
          title: 'Technical Excellence',
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Describe the technical achievements and impact',
              validation: (Rule: any) => Rule.required().error('Please describe the technical excellence impact'),
            },
            {
              name: 'bulletPoints',
              title: 'Key Achievements',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Add key technical achievements (e.g., Modern tech stack, Optimized performance)',
              validation: (Rule: any) => Rule.required().min(1).error('Please add at least one achievement'),
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          preview: {
            select: {
              description: 'description',
              bulletPoints: 'bulletPoints',
            },
            prepare(selection: any) {
              const { description, bulletPoints } = selection
              const descriptionPreview = description ? description.substring(0, 60) + (description.length > 60 ? '...' : '') : 'No description'
              const bulletCount = bulletPoints ? bulletPoints.length : 0
              return {
                title: 'Technical Excellence',
                subtitle: `${descriptionPreview} • ${bulletCount} achievements`,
              }
            },
          },
        },
      ],
      options: {
        collapsible: false,
        collapsed: false,
      },
      preview: {
        select: {
          userExpDesc: 'userExperience.description',
          techDesc: 'technicalExcellence.description',
          userExpBullets: 'userExperience.bulletPoints',
          techBullets: 'technicalExcellence.bulletPoints',
        },
        prepare(selection: any) {
          const { userExpDesc, techDesc, userExpBullets, techBullets } = selection
          const userExpCount = userExpBullets ? userExpBullets.length : 0
          const techCount = techBullets ? techBullets.length : 0
          return {
            title: 'Results & Impact',
            subtitle: `User Experience: ${userExpCount} achievements • Technical Excellence: ${techCount} achievements`,
          }
        },
      },
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to the GitHub repository',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      featured: 'featured',
    },
    prepare(selection: any) {
      const { featured } = selection
      return Object.assign({}, selection, {
        subtitle: featured ? 'Featured Project' : 'Project',
      })
    },
  },
})
