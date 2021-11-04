import { GoLink, GoLinkExternal } from 'react-icons/go';

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'Internal link',
            name: 'internalLink',
            type: 'object',
            blockEditor: {
              icon: GoLink,
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [{ type: 'entity' }, { type: 'category' }],
              },
            ],
          },
          {
            title: 'External Link',
            name: 'externalLink',
            type: 'object',
            blockEditor: {
              icon: GoLinkExternal,
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean',
              },
            ],
          },
        ],
      },
      // of: [{ type: 'authorReference' }],
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'mainImage',
      options: { hotspot: true },
    },
  ],
};
