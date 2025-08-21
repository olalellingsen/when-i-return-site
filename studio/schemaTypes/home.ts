import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      type: 'object',
      name: 'homeImage',
      title: 'Home Image',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
      preview: {
        select: {
          media: 'image',
          alt: 'alt',
          caption: 'caption',
        },
        prepare({media, alt, caption}) {
          return {
            title: 'Image',
            subtitle: caption || alt,
            media,
          }
        },
      },
    }),

    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      description: 'Add content blocks to build your home page.',
      type: 'array',
      of: [
        // Rich Text Block
        {
          type: 'object',
          name: 'richText',
          title: 'Rich Text',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{type: 'block'}],
            },
          ],
          preview: {
            select: {
              content: 'content',
            },
            prepare({content}) {
              const block = (content || []).find((block: any) => block._type === 'block')
              return {
                title: 'Rich Text',
                subtitle: block?.children?.[0]?.text || 'No content',
              }
            },
          },
        },

        {
          type: 'object',
          name: 'spotifyPlayer',
          title: 'Spotify Player',
          fields: [
            {
              name: 'url',
              title: 'Spotify URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  {title: 'Compact', value: 'compact'},
                  {title: 'Regular', value: 'regular'},
                  {title: 'Large', value: 'large'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            prepare({}) {
              return {
                title: 'Spotify Player',
              }
            },
          },
        },

        // Gallery Block
        {
          type: 'object',
          name: 'gallery',
          title: 'Image Gallery',
          fields: [
            {
              name: 'title',
              title: 'Gallery Title',
              type: 'string',
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    },
                    {
                      name: 'alt',
                      title: 'Alternative text',
                      type: 'string',
                    },
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              title: 'title',
              images: 'images',
            },
            prepare({title, images}) {
              const imageCount = images?.length || 0
              return {
                title: 'Image Gallery',
                subtitle: `${title || 'Untitled'} (${imageCount} image${imageCount !== 1 ? 's' : ''})`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error('Page must have at least one content block'),
    }),
  ],
})
