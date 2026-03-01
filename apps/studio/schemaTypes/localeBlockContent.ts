import {defineField, defineType} from 'sanity'

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized rich text',
  type: 'object',
  fields: [
    defineField({name: 'uk', title: 'Українська', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'it', title: 'Italiano', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'en', title: 'English', type: 'array', of: [{type: 'block'}]}),
  ],
})