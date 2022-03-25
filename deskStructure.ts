import S from '@sanity/desk-tool/structure-builder'
import {FaUserTie} from 'react-icons/fa'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Professionnels')
        .icon(FaUserTie)
        .child(S.documentTypeList('entity').title('Professionnels').child(null)),
      S.listItem()
        .title('Catégories')
        .child(S.documentTypeList('category').title('Catégories').child(null)),
      S.divider(),
      S.listItem()
        .title('Filtres')
        .child(
          S.list()
            .title('Filtres')
            .items([
              S.listItem()
                .title('Professionnels par catégories')
                .child(
                  S.documentTypeList('category')
                    .title('Professionnels par catégories')
                    .child((catId) =>
                      S.documentList()
                        .title('Professionnels')
                        .filter('_type == "entity" && $catId in categories[]._ref')
                        .params({catId})
                    )
                ),
              S.listItem()
                .title('Catégories sans description')
                .child(
                  S.documentList()
                    .title('Catégories sans description')
                    .filter('_type == "category" && !defined(description)')
                ),
            ])
        ),
    ])
