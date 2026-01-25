import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'donateLinks',
      title: 'Donate links',
      type: 'object',
      fields: [
        defineField({
          name: 'paypal',
          title: 'PayPal link',
          type: 'url',
        }),
        defineField({
          name: 'card',
          title: 'Card payment link',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'defaultLocale',
      title: 'Default locale',
      type: 'string',
      options: {
        list: [
          {title: 'Ukrainian', value: 'uk'},
          {title: 'Italian', value: 'it'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
      initialValue: 'uk',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
