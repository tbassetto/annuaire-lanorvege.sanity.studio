import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
import category from './documents/category'
import entity from './documents/entity'
// import list from './documents/list';
import bodyPortableText from './objects/bodyPortableText'
import mainImage from './objects/mainImage'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    category,
    entity,
    // list,
    bodyPortableText,
    mainImage,
  ]),
})
