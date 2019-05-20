import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { resultKeyNameFromField } from 'apollo-utilities';

const App = () => {
  const [page, setPage] = useState('authors')

  const ALL_AUTHORS = gql`
  {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`
const ALL_BOOKS = gql`
  {
    allBooks {
      title,
      author,
      published,
      id
    }
  }
`

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

    
      <Authors result={useQuery(ALL_AUTHORS)}
        show={page === 'authors'}
      />

      <Books result={useQuery(ALL_BOOKS)}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
