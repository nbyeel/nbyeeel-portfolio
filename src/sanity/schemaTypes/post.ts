import { defineField, defineType } from 'sanity'

// Custom text field with typography controls
const textWithTypography = {
  name: 'textWithTypography',
  title: 'Text with Typography',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text Content',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'letterSpacing',
      title: 'Letter Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Tight (-0.05em)', value: '-0.05em' },
          { title: 'Normal (0em)', value: '0em' },
          { title: 'Wide (0.05em)', value: '0.05em' },
          { title: 'Wider (0.1em)', value: '0.1em' },
          { title: 'Extra Wide (0.15em)', value: '0.15em' },
        ],
        layout: 'dropdown',
      },
      initialValue: '0em',
    },
    {
      name: 'lineHeight',
      title: 'Line Height',
      type: 'string',
      options: {
        list: [
          { title: 'Tight (1.2)', value: '1.2' },
          { title: 'Normal (1.5)', value: '1.5' },
          { title: 'Relaxed (1.7)', value: '1.7' },
          { title: 'Loose (2.0)', value: '2.0' },
          { title: 'Extra Loose (2.5)', value: '2.5' },
        ],
        layout: 'dropdown',
      },
      initialValue: '1.5',
    },
    {
      name: 'fontSize',
      title: 'Font Size',
      type: 'string',
      options: {
        list: [
          { title: 'Tiny (8px)', value: '8px' },
          { title: 'Very Small (10px)', value: '10px' },
          { title: 'Small (12px)', value: '12px' },
          { title: 'Medium Small (13px)', value: '13px' },
          { title: 'Small (14px)', value: '14px' },
          { title: 'Normal (16px)', value: '16px' },
          { title: 'Large (18px)', value: '18px' },
          { title: 'Extra Large (20px)', value: '20px' },
          { title: 'XXL (24px)', value: '24px' },
          { title: 'Custom Size', value: 'custom' },
        ],
        layout: 'dropdown',
      },
      initialValue: '16px',
    },
    {
      name: 'customFontSize',
      title: 'Custom Font Size (px)',
      type: 'number',
      description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
      hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
      validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
    },
  ],
  preview: {
    select: {
      text: 'text',
      letterSpacing: 'letterSpacing',
      lineHeight: 'lineHeight',
      fontSize: 'fontSize',
      customFontSize: 'customFontSize',
    },
    prepare(selection: any) {
      const { text, letterSpacing, lineHeight, fontSize, customFontSize } = selection
      const preview = text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : 'No text'
      const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
      return {
        title: preview,
        subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
      }
    },
  },
}

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
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
      name: 'hook',
      title: 'Hook',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Hook Text',
          type: 'text',
          rows: 2,
          description: 'A short, compelling line (1-2 sentences) to hook the reader and grab their attention',
          validation: (Rule: any) => Rule.max(200).warning('Hook should be brief and impactful'),
        },
        {
          name: 'letterSpacing',
          title: 'Letter Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (-0.05em)', value: '-0.05em' },
              { title: 'Normal (0em)', value: '0em' },
              { title: 'Wide (0.05em)', value: '0.05em' },
              { title: 'Wider (0.1em)', value: '0.1em' },
              { title: 'Extra Wide (0.15em)', value: '0.15em' },
            ],
            layout: 'dropdown',
          },
          initialValue: '0em',
        },
        {
          name: 'lineHeight',
          title: 'Line Height',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (1.2)', value: '1.2' },
              { title: 'Normal (1.5)', value: '1.5' },
              { title: 'Relaxed (1.7)', value: '1.7' },
              { title: 'Loose (2.0)', value: '2.0' },
              { title: 'Extra Loose (2.5)', value: '2.5' },
            ],
            layout: 'dropdown',
          },
          initialValue: '1.5',
        },
        {
          name: 'fontSize',
          title: 'Font Size',
          type: 'string',
          options: {
            list: [
              { title: 'Tiny (8px)', value: '8px' },
              { title: 'Very Small (10px)', value: '10px' },
              { title: 'Small (12px)', value: '12px' },
              { title: 'Medium Small (13px)', value: '13px' },
              { title: 'Small (14px)', value: '14px' },
              { title: 'Normal (16px)', value: '16px' },
              { title: 'Large (18px)', value: '18px' },
              { title: 'Extra Large (20px)', value: '20px' },
              { title: 'XXL (24px)', value: '24px' },
              { title: 'Custom Size', value: 'custom' },
            ],
            layout: 'dropdown',
          },
          initialValue: '16px',
        },
        {
          name: 'customFontSize',
          title: 'Custom Font Size (px)',
          type: 'number',
          description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
          hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
          validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
        },
      ],
      preview: {
        select: {
          text: 'text',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          fontSize: 'fontSize',
          customFontSize: 'customFontSize',
        },
        prepare(selection: any) {
          const { text, letterSpacing, lineHeight, fontSize, customFontSize } = selection
          const preview = text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : 'No text'
          const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
          return {
            title: preview,
            subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
          }
        },
      },
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image / Hero',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/jpeg, image/png, image/webp, image/gif',
      },
      description: 'Upload the hero/cover image for this blog post',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Introduction Headline',
          type: 'string',
          description: 'Custom headline for the introduction section (e.g., "Introduction", "Getting Started", "Overview")',
          validation: (Rule: any) => Rule.max(100).warning('Headline should be concise and clear'),
        },
        {
          name: 'text',
          title: 'Introduction Text',
          type: 'text',
          rows: 4,
          description: 'Opening paragraph that hooks the reader and introduces the topic',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'letterSpacing',
          title: 'Letter Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (-0.05em)', value: '-0.05em' },
              { title: 'Normal (0em)', value: '0em' },
              { title: 'Wide (0.05em)', value: '0.05em' },
              { title: 'Wider (0.1em)', value: '0.1em' },
              { title: 'Extra Wide (0.15em)', value: '0.15em' },
            ],
            layout: 'dropdown',
          },
          initialValue: '0em',
        },
        {
          name: 'lineHeight',
          title: 'Line Height',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (1.2)', value: '1.2' },
              { title: 'Normal (1.5)', value: '1.5' },
              { title: 'Relaxed (1.7)', value: '1.7' },
              { title: 'Loose (2.0)', value: '2.0' },
              { title: 'Extra Loose (2.5)', value: '2.5' },
            ],
            layout: 'dropdown',
          },
          initialValue: '1.5',
        },
        {
          name: 'fontSize',
          title: 'Font Size',
          type: 'string',
          options: {
            list: [
              { title: 'Tiny (8px)', value: '8px' },
              { title: 'Very Small (10px)', value: '10px' },
              { title: 'Small (12px)', value: '12px' },
              { title: 'Medium Small (13px)', value: '13px' },
              { title: 'Small (14px)', value: '14px' },
              { title: 'Normal (16px)', value: '16px' },
              { title: 'Large (18px)', value: '18px' },
              { title: 'Extra Large (20px)', value: '20px' },
              { title: 'XXL (24px)', value: '24px' },
              { title: 'Custom Size', value: 'custom' },
            ],
            layout: 'dropdown',
          },
          initialValue: '16px',
        },
        {
          name: 'customFontSize',
          title: 'Custom Font Size (px)',
          type: 'number',
          description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
          hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
          validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
        },
      ],
      preview: {
        select: {
          headline: 'headline',
          text: 'text',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          fontSize: 'fontSize',
          customFontSize: 'customFontSize',
        },
        prepare(selection: any) {
          const { headline, text, letterSpacing, lineHeight, fontSize, customFontSize } = selection
          const preview = text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : 'No text'
          const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
          const headlineText = headline || 'Introduction'
          return {
            title: `${headlineText}: ${preview}`,
            subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
          }
        },
      },
    }),
    defineField({
      name: 'mainBody',
      title: 'Main Body Content',
      type: 'object',
      fields: [
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
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
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Description of the image for accessibility',
                },
                {
                  name: 'caption',
                  title: 'Caption',
                  type: 'string',
                  description: 'Optional caption for the image',
                },
              ],
            },
          ],
          description: 'The main content of your blog post. Use the rich text editor to format your content.',
          validation: (Rule: any) => Rule.required().min(1),
        },
        {
          name: 'letterSpacing',
          title: 'Letter Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (-0.05em)', value: '-0.05em' },
              { title: 'Normal (0em)', value: '0em' },
              { title: 'Wide (0.05em)', value: '0.05em' },
              { title: 'Wider (0.1em)', value: '0.1em' },
              { title: 'Extra Wide (0.15em)', value: '0.15em' },
            ],
            layout: 'dropdown',
          },
          initialValue: '0em',
        },
        {
          name: 'lineHeight',
          title: 'Line Height',
          type: 'string',
          options: {
            list: [
              { title: 'Very Tight (1.0)', value: '1.0' },
              { title: 'Tight (1.2)', value: '1.2' },
              { title: 'Normal (1.5)', value: '1.5' },
              { title: 'Relaxed (1.7)', value: '1.7' },
              { title: 'Loose (2.0)', value: '2.0' },
              { title: 'Extra Loose (2.5)', value: '2.5' },
            ],
            layout: 'dropdown',
          },
          initialValue: '1.5',
        },
        {
          name: 'fontSize',
          title: 'Font Size',
          type: 'string',
          options: {
            list: [
              { title: 'Tiny (8px)', value: '8px' },
              { title: 'Very Small (10px)', value: '10px' },
              { title: 'Small (12px)', value: '12px' },
              { title: 'Medium Small (13px)', value: '13px' },
              { title: 'Small (14px)', value: '14px' },
              { title: 'Normal (16px)', value: '16px' },
              { title: 'Large (18px)', value: '18px' },
              { title: 'Extra Large (20px)', value: '20px' },
              { title: 'XXL (24px)', value: '24px' },
              { title: 'Custom Size', value: 'custom' },
            ],
            layout: 'dropdown',
          },
          initialValue: '16px',
        },
        {
          name: 'customFontSize',
          title: 'Custom Font Size (px)',
          type: 'number',
          description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
          hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
          validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
        },
      ],
      preview: {
        select: {
          content: 'content',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          fontSize: 'fontSize',
          customFontSize: 'customFontSize',
        },
        prepare(selection: any) {
          const { content, letterSpacing, lineHeight, fontSize, customFontSize } = selection
          const hasContent = content && content.length > 0
          const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
          return {
            title: hasContent ? 'Main Body Content' : 'No content',
            subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
          }
        },
      },
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion / Wrap-Up',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Conclusion Text',
          type: 'text',
          rows: 4,
          description: 'Closing thoughts that summarize the key points and provide a satisfying ending',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'letterSpacing',
          title: 'Letter Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (-0.05em)', value: '-0.05em' },
              { title: 'Normal (0em)', value: '0em' },
              { title: 'Wide (0.05em)', value: '0.05em' },
              { title: 'Wider (0.1em)', value: '0.1em' },
              { title: 'Extra Wide (0.15em)', value: '0.15em' },
            ],
            layout: 'dropdown',
          },
          initialValue: '0em',
        },
        {
          name: 'lineHeight',
          title: 'Line Height',
          type: 'string',
          options: {
            list: [
              { title: 'Tight (1.2)', value: '1.2' },
              { title: 'Normal (1.5)', value: '1.5' },
              { title: 'Relaxed (1.7)', value: '1.7' },
              { title: 'Loose (2.0)', value: '2.0' },
              { title: 'Extra Loose (2.5)', value: '2.5' },
            ],
            layout: 'dropdown',
          },
          initialValue: '1.5',
        },
        {
          name: 'fontSize',
          title: 'Font Size',
          type: 'string',
          options: {
            list: [
              { title: 'Tiny (8px)', value: '8px' },
              { title: 'Very Small (10px)', value: '10px' },
              { title: 'Small (12px)', value: '12px' },
              { title: 'Medium Small (13px)', value: '13px' },
              { title: 'Small (14px)', value: '14px' },
              { title: 'Normal (16px)', value: '16px' },
              { title: 'Large (18px)', value: '18px' },
              { title: 'Extra Large (20px)', value: '20px' },
              { title: 'XXL (24px)', value: '24px' },
              { title: 'Custom Size', value: 'custom' },
            ],
            layout: 'dropdown',
          },
          initialValue: '16px',
        },
        {
          name: 'customFontSize',
          title: 'Custom Font Size (px)',
          type: 'number',
          description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
          hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
          validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
        },
      ],
      preview: {
        select: {
          text: 'text',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          fontSize: 'fontSize',
          customFontSize: 'customFontSize',
        },
        prepare(selection: any) {
          const { text, letterSpacing, lineHeight, fontSize, customFontSize } = selection
          const preview = text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : 'No text'
          const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
          return {
            title: preview,
            subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
          }
        },
      },
    }),
    defineField({
      name: 'callToAction',
      title: 'Call-to-Action (CTA)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          description: 'The main CTA text (e.g., "Get Started", "Learn More")',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Description Text',
              type: 'text',
              rows: 2,
              description: 'Brief description to encourage action',
            },
            {
              name: 'letterSpacing',
              title: 'Letter Spacing',
              type: 'string',
              options: {
                list: [
                  { title: 'Tight (-0.05em)', value: '-0.05em' },
                  { title: 'Normal (0em)', value: '0em' },
                  { title: 'Wide (0.05em)', value: '0.05em' },
                  { title: 'Wider (0.1em)', value: '0.1em' },
                  { title: 'Extra Wide (0.15em)', value: '0.15em' },
                ],
                layout: 'dropdown',
              },
              initialValue: '0em',
            },
            {
              name: 'lineHeight',
              title: 'Line Height',
              type: 'string',
              options: {
                list: [
                  { title: 'Tight (1.2)', value: '1.2' },
                  { title: 'Normal (1.5)', value: '1.5' },
                  { title: 'Relaxed (1.7)', value: '1.7' },
                  { title: 'Loose (2.0)', value: '2.0' },
                  { title: 'Extra Loose (2.5)', value: '2.5' },
                ],
                layout: 'dropdown',
              },
              initialValue: '1.5',
            },
            {
              name: 'fontSize',
              title: 'Font Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Tiny (8px)', value: '8px' },
                  { title: 'Very Small (10px)', value: '10px' },
                  { title: 'Small (12px)', value: '12px' },
                  { title: 'Medium Small (13px)', value: '13px' },
                  { title: 'Small (14px)', value: '14px' },
                  { title: 'Normal (16px)', value: '16px' },
                  { title: 'Large (18px)', value: '18px' },
                  { title: 'Extra Large (20px)', value: '20px' },
                  { title: 'XXL (24px)', value: '24px' },
                  { title: 'Custom Size', value: 'custom' },
                ],
                layout: 'dropdown',
              },
              initialValue: '16px',
            },
            {
              name: 'customFontSize',
              title: 'Custom Font Size (px)',
              type: 'number',
              description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
              hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
              validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
            },
          ],
          preview: {
            select: {
              text: 'text',
              letterSpacing: 'letterSpacing',
              lineHeight: 'lineHeight',
              fontSize: 'fontSize',
              customFontSize: 'customFontSize',
            },
            prepare(selection: any) {
              const { text, letterSpacing, lineHeight, fontSize, customFontSize } = selection
              const preview = text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : 'No text'
              const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
              return {
                title: preview,
                subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
              }
            },
          },
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text for the action button',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'url',
          description: 'Where the button should link to',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary (Blue)', value: 'primary' },
              { title: 'Secondary (Gray)', value: 'secondary' },
              { title: 'Success (Green)', value: 'success' },
              { title: 'Warning (Orange)', value: 'warning' },
              { title: 'Danger (Red)', value: 'danger' },
            ],
            layout: 'dropdown',
          },
          initialValue: 'primary',
        },
      ],
      options: {
        collapsible: false,
        collapsed: false,
      },
      preview: {
        select: {
          title: 'title',
          buttonText: 'buttonText',
          buttonUrl: 'buttonUrl',
        },
        prepare(selection: any) {
          const { title, buttonText, buttonUrl } = selection
          return {
            title: title || 'Call-to-Action',
            subtitle: `${buttonText} → ${buttonUrl || 'No URL'}`,
          }
        },
      },
    }),
    defineField({
      name: 'author',
      title: 'Author Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Author Name',
          type: 'string',
          description: 'Full name of the author',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'avatar',
          title: 'Author Avatar',
          type: 'image',
          options: {
            accept: 'image/jpeg, image/png, image/webp',
          },
          description: 'Profile picture of the author',
        },
        {
          name: 'bio',
          title: 'Author Bio',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Bio Text',
              type: 'text',
              rows: 3,
              description: 'Brief biography of the author',
            },
            {
              name: 'letterSpacing',
              title: 'Letter Spacing',
              type: 'string',
              options: {
                list: [
                  { title: 'Tight (-0.05em)', value: '-0.05em' },
                  { title: 'Normal (0em)', value: '0em' },
                  { title: 'Wide (0.05em)', value: '0.05em' },
                  { title: 'Wider (0.1em)', value: '0.1em' },
              { title: 'Extra Wide (0.15em)', value: '0.15em' },
                ],
                layout: 'dropdown',
              },
              initialValue: '0em',
            },
            {
              name: 'lineHeight',
              title: 'Line Height',
              type: 'string',
              options: {
                list: [
                  { title: 'Tight (1.2)', value: '1.2' },
                  { title: 'Normal (1.5)', value: '1.5' },
                  { title: 'Relaxed (1.7)', value: '1.7' },
                  { title: 'Loose (2.0)', value: '2.0' },
                  { title: 'Extra Loose (2.5)', value: '2.5' },
                ],
                layout: 'dropdown',
              },
              initialValue: '1.5',
            },
            {
              name: 'fontSize',
              title: 'Font Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Tiny (8px)', value: '8px' },
                  { title: 'Very Small (10px)', value: '10px' },
                  { title: 'Small (12px)', value: '12px' },
                  { title: 'Medium Small (13px)', value: '13px' },
                  { title: 'Small (14px)', value: '14px' },
                  { title: 'Normal (16px)', value: '16px' },
                  { title: 'Large (18px)', value: '18px' },
                  { title: 'Extra Large (20px)', value: '20px' },
                  { title: 'XXL (24px)', value: '24px' },
                  { title: 'Custom Size', value: 'custom' },
                ],
                layout: 'dropdown',
              },
              initialValue: '16px',
            },
            {
              name: 'customFontSize',
              title: 'Custom Font Size (px)',
              type: 'number',
              description: 'Enter custom font size in pixels (e.g., 9, 11, 15, etc.)',
              hidden: ({ parent }: any) => parent?.fontSize !== 'custom',
              validation: (Rule: any) => Rule.min(5).max(50).warning('Font size should be between 5px and 50px'),
            },
          ],
          preview: {
            select: {
              text: 'text',
              letterSpacing: 'letterSpacing',
              lineHeight: 'lineHeight',
              fontSize: 'fontSize',
              customFontSize: 'customFontSize',
            },
            prepare(selection: any) {
              const { text, letterSpacing, lineHeight, fontSize, customFontSize } = selection
              const preview = text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : 'No text'
              const finalFontSize = fontSize === 'custom' ? `${customFontSize}px` : fontSize
              return {
                title: preview,
                subtitle: `LS: ${letterSpacing} | LH: ${lineHeight} | FS: ${finalFontSize}`,
              }
            },
          },
        },
        {
          name: 'website',
          title: 'Author Website',
          type: 'url',
          description: 'Link to author\'s personal website or portfolio',
        },
        {
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'object',
          fields: [
            {
              name: 'twitter',
              title: 'Twitter/X',
              type: 'url',
            },
            {
              name: 'linkedin',
              title: 'LinkedIn',
              type: 'url',
            },
            {
              name: 'github',
              title: 'GitHub',
              type: 'url',
            },
          ],
        },
      ],
      options: {
        collapsible: false,
        collapsed: false,
      },
      preview: {
        select: {
          name: 'name',
          avatar: 'avatar',
          bio: 'bio',
        },
        prepare(selection: any) {
          const { name, avatar, bio } = selection
          const bioPreview = bio ? bio.substring(0, 60) + (bio.length > 60 ? '...' : '') : 'No bio'
          return {
            title: name || 'Author',
            subtitle: bioPreview,
            media: avatar,
          }
        },
      },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the technologies, tools, or frameworks mentioned or used in this blog post',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      publishedAt: 'publishedAt',
      coverImage: 'coverImage',
    },
    prepare(selection: any) {
      const { title, author, publishedAt, coverImage } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Not published'
      return {
        title: title,
        subtitle: `By ${author || 'Unknown'} • ${date}`,
        media: coverImage,
      }
    },
  },
})
