export default {
  title: 'List',
  name: 'list',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
    },
    {
      name: 'description',
      type: 'bodyPortableText',
      title: 'Description',
    },
    {
      name: 'entities',
      type: 'array',
      title: 'Entities',
      of: [
        {
          type: 'reference',
          to: {
            type: 'entity',
          },
        },
      ],
    },
  ],
};
