import {defineType, defineField} from 'sanity'

export const concerts = defineType({
  name: 'concerts',
  type: 'document',
  title: 'Concerts',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
    }),
    defineField({
      name: 'time',
      type: 'string',
      title: 'Time',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
  ],
})
