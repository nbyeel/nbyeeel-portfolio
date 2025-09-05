import { defineType, defineField } from 'sanity'

export const career = defineType({
  name: 'career',
  title: 'Career',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g., "2023 - Present" or "2021 - 2023"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent should be 1)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Position',
      type: 'boolean',
      description: 'Check if this is your current position',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Order (Most Recent First)',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
      period: 'period'
    },
    prepare(selection) {
      const { title, subtitle, period } = selection
      return {
        title: title,
        subtitle: `${subtitle} • ${period}`
      }
    }
  }
})
