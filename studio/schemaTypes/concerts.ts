import {defineType, defineField} from 'sanity'

export const concerts = defineType({
  name: 'concerts',
  type: 'document',
  title: 'Concerts',
  fields: [
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
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
      name: 'ticketsLink',
      title: 'Link to tickets',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
  ],
  orderings: [
    {
      name: 'date',
      title: 'Date (descending)',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      location: 'location',
      date: 'date',
    },
    prepare(selection) {
      const {location, date} = selection
      return {
        title: location,
        subtitle: date || 'No date set',
      }
    },
  },
})
