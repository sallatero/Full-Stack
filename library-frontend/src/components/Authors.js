import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'

const Authors = (props) => {
  //console.log('Authors props: ', props)
  const client = useApolloClient()

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Authors