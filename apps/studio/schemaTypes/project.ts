import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc?.title?.it || doc?.title?.en || doc?.title?.uk,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().warning('Slug is required and should be URL-friendly'),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) =>
        Rule.required().warning(
          'Image is recommended for better layout. Recommended: JPG/WebP, 2–3MB max, horizontal 4:3 or 16:9',
        ),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'localeString',
        }),
      ],
    }),
  ],
})
