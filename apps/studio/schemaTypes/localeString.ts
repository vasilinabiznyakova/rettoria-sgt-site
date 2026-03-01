import {defineField, defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({
      name: 'uk',
      title: 'Українська',
      type: 'string',
      validation: (Rule) => Rule.max(90).warning('Рекомендовано до 90 символів'),
    }),
    defineField({
      name: 'it',
      title: 'Italiano',
      type: 'string',
      validation: (Rule) => Rule.max(90).warning('Lunghezza consigliata: fino a 90 caratteri'),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (Rule) => Rule.max(90).warning('Recommended up to 90 characters'),
    }),
  ],
})
