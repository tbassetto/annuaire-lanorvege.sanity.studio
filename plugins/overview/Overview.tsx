// import imageUrlBuilder from '@sanity/image-url'
import {Card, Text, Container, Heading, Stack} from '@sanity/ui'
import studioClient from 'part:@sanity/base/client'
import * as React from 'react'
import {useEffect} from 'react'
import {useTable, useSortBy} from 'react-table'
import styled from 'styled-components'

const client = studioClient.withConfig({apiVersion: 'v2021-03-25', dataset: 'production'})
// const builder = imageUrlBuilder(client)
// function urlFor(source) {
//   return builder.image(source)
// }
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export const Overview = () => {
  const [entities, setEntities] = React.useState<any[]>([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'name',
      },
      {
        Header: 'Visible',
        accessor: 'published',
        Cell: ({value}) => <div>{value ? '✅' : '❌'}</div>,
      },
      {
        Header: 'Logo',
        accessor: 'logo',
        Cell: ({value}) =>
          value && value._type === 'image'
            ? 'oui'
            : // <img src={urlFor(value).width(140).height(70).fit('max').url()} />
              'non',
      },
      {
        Header: 'Présence',
        accessor: 'presence',
      },
      {
        Header: 'Adresse',
        accessor: 'location',
        Cell: ({value}) => (value ? <div>{value}</div> : null),
      },
      {
        Header: 'Région',
        accessor: 'fylke',
      },
      {
        Header: 'Coordonnées',
        accessor: 'coordinate',
        Cell: ({value}) =>
          value ? (
            <div>
              {value.lng}, {value.lat}
            </div>
          ) : null,
      },
      {
        Header: 'Catégories',
        accessor: 'categories',
        Cell: ({value}) =>
          value ? (
            <ul>
              {value.map((cat) => (
                <li key={cat._id}>{cat.name}</li>
              ))}
            </ul>
          ) : null,
      },
    ],
    []
  )

  const tableInstance = useTable({columns, data: entities}, useSortBy)

  useEffect(() => {
    // b93d201b-90b4-4485-9d5b-3edc99a94dd1 is my test company
    const query = `*[_type == "entity" && !(_id in path('drafts.**')) && _id != "b93d201b-90b4-4485-9d5b-3edc99a94dd1"] {
      ...,
      "slug":slug.current,
      categories[]->
    }`

    client.fetch(query).then((entities: any[]) => {
      entities.sort((a, b) => a.name.localeCompare(b.name))
      setEntities(entities)
    })
  }, [])

  if (!entities || entities.length === 0) return null

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

  return (
    <Container width={2}>
      <Card margin={3} padding={4}>
        <Stack space={4}>
          <Heading as="h1" size={5}>
            {entities.length} Entities 👀
          </Heading>
          <Text>{entities.filter((e) => e.published).length} visibles</Text>
        </Stack>
      </Card>

      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Styles>
    </Container>
  )
}
