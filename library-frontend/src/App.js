import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

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
  const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String!]!) {
      addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
      ){
        title
        published
        author
        genres
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

      <NewBook mutation={useMutation(CREATE_BOOK)}
        show={page === 'add'}
      />

    </div>
  )
}

export default App
