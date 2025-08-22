import {defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Links',
      }
    },
  },
})
