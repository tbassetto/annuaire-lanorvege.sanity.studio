import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaPhoneAlt,
  FaRegEnvelope,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import generatePassword from 'omgopass'

function hideIfOnlineOnly({document}) {
  return document?.presence === 'onlineOnly' || document?.presence === undefined
}

export default {
  title: 'Entity',
  name: 'entity',
  type: 'document',
  fieldsets: [
    {
      name: 'private',
      title: 'Administration',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'obligatory',
      title: 'Champs obligatoires',
    },
  ],
  fields: [
    {
      title: 'Organisasjonsnummer',
      name: 'organisasjonsnummer',
      type: 'string',
      fieldset: 'private',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Contact principal',
      name: 'primaryContact',
      type: 'string',
      description: 'Email ou téléphone en cas d’urgence',
      fieldset: 'private',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Mot de passe',
      name: 'password',
      type: 'slug',
      description: 'Pour permettre de modifier la page',
      fieldset: 'private',
      options: {
        source: 'name',
        slugify: () => generatePassword({separators: '-=~+'}),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Visible sur le site',
      name: 'published',
      type: 'boolean',
      fieldset: 'private',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Nom',
      name: 'name',
      type: 'string',
      fieldset: 'obligatory',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Ne doit pas être changé une fois créé',
      fieldset: 'obligatory',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Description courte',
      description: 'Pour la page d’accueil',
      fieldset: 'obligatory',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      description: 'Logo de l’enseigne',
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      fieldset: 'obligatory',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    },
    {
      title: 'Présence en ligne',
      name: 'some',
      type: 'array',
      description:
        'Le premier sera mis en avant sur le site web. Recommandés : Site web et/ou Facebook + WhatsApp ou adresse email',
      fieldset: 'obligatory',
      of: [
        {
          title: 'Site Web',
          name: 'website',
          type: 'object',
          fields: [
            {
              title: 'URL',
              name: 'url',
              type: 'url',
              initialValue: 'https://',
              validation: (Rule) =>
                Rule.required().custom((url) => {
                  const re = new RegExp('^(http|https)://', 'i')
                  return re.test(url) ? true : 'Le format accepté est https://xxx'
                }),
            },
          ],
          icon: FaGlobe,
        },
        {
          title: 'Facebook',
          name: 'facebook',
          type: 'object',
          fields: [
            {
              title: 'URL',
              name: 'url',
              type: 'url',
              description: 'Adress complète vers la page Facebook',
              initialValue: 'https://www.facebook.com/',
              validation: (Rule) =>
                Rule.required().custom((url) => {
                  return url.indexOf('https://www.facebook.com/') === 0
                    ? true
                    : 'Le format accepté est https://www.facebook.com/xxx'
                }),
            },
          ],
          icon: FaFacebook,
        },
        {
          title: 'WhatsApp',
          name: 'whatsapp',
          type: 'object',
          fields: [
            {
              title: 'WhatsApp',
              name: 'phoneNumber',
              type: 'string',
              initialValue: '+47',
              // TODO: validate phone number with international code
              validation: (Rule) => Rule.required(),
            },
          ],
          icon: FaWhatsapp,
        },
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'object',
          fields: [
            {
              title: 'Nom d’utilisateur',
              name: 'handle',
              description: 'Sans le @',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          icon: FaInstagram,
        },
        {
          title: 'Twitter',
          name: 'twitter',
          type: 'object',
          fields: [
            {
              title: 'Nom d’utilisateur',
              name: 'handle',
              description: 'Sans le @',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          icon: FaTwitter,
        },
        {
          title: 'Adresse email',
          name: 'emailAddress',
          type: 'object',
          fields: [
            {
              title: 'Adresse email',
              name: 'address',
              type: 'email',
              // TODO: validate email address
              validation: (Rule) => Rule.required(),
            },
          ],
          icon: FaRegEnvelope,
        },
        {
          title: 'Téléphone',
          name: 'phone',
          type: 'object',
          fields: [
            {
              title: 'Phone Number',
              name: 'phoneNumber',
              type: 'string',
              initialValue: '+47',
              // TODO: validate phone number with international code
              validation: (Rule) => Rule.required(),
            },
          ],
          icon: FaPhoneAlt,
        },
      ],
    },
    // {
    //   name: 'photo',
    //   type: 'mainImage',
    //   title: 'Photo (devanture, produits, flyer, etc.)',
    // },
    // {
    //   name: 'description',
    //   type: 'bodyPortableText',
    //   title: 'Description complète',
    //   description: 'Pas encore utilisé !',
    // },
    // {
    //   title: 'Tags',
    //   name: 'tags',
    //   type: 'array',
    //   hidden: true,
    //   description: 'Used to link entities together / to find related entities',
    //   of: [
    //     {
    //       type: 'string',
    //     },
    //   ],
    //   options: {
    //     layout: 'tags',
    //   },
    // },
    {
      title: 'Présence',
      name: 'presence',
      type: 'string',
      options: {
        list: [
          {title: 'Seulement en ligne', value: 'onlineOnly'},
          {title: 'Seulement en physique', value: 'localOnly'},
          {title: 'Les deux', value: 'onlineAndLocal'},
        ],
        layout: 'radio',
      },
    },
    {
      title: 'Région',
      name: 'fylke',
      hidden: hideIfOnlineOnly,
      type: 'string',
      options: {
        list: [
          {title: 'All Of Norway', value: 'all'},
          {title: 'Agder', value: 'agder'},
          {title: 'Innlandet', value: 'innlandet'},
          {title: 'Møre og Romsdal', value: 'more-og-romsdal'},
          {title: 'Nordland', value: 'nordland'},
          {title: 'Oslo', value: 'oslo'},
          {title: 'Rogaland', value: 'rogaland'},
          {title: 'Vestfold og Telemark', value: 'vestfold-og-telemark'},
          {title: 'Troms og Finnmark', value: 'troms-og-finnmark'},
          {title: 'Trøndelag', value: 'trondelag'},
          {title: 'Vestland', value: 'vestland'},
          {title: 'Viken', value: 'viken'},
          {title: 'N/A', value: 'na'},
        ],
      },
    },
    {
      title: 'Adresse postale',
      name: 'location',
      hidden: hideIfOnlineOnly,
      type: 'string',
    },
    {
      title: 'Coordonnées',
      name: 'coordinate',
      hidden: hideIfOnlineOnly,
      description: 'On peut utiliser https://docs.mapbox.com/playground/geocoding/',
      type: 'geopoint',
    },
  ],
  preview: {
    select: {
      name: 'name',
      published: 'published',
      logo: 'logo',
    },
    prepare(selection) {
      const {name, published, logo} = selection
      return {
        title: name,
        subtitle: `Visible : ${published ? '✅' : '❌'}`,
        media: logo,
      }
    },
  },
}
