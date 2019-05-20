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
  const UPDATE_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
      editAuthor(
        name: $name,
        setBornTo: $setBornTo
      ){
        name
        born
        id
        bookCount
      }
    }
  `

  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const updateBirthYear = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

    
      <Authors result={useQuery(ALL_AUTHORS)} mutation={updateBirthYear}
        show={page === 'authors'}
      />

      <Books result={useQuery(ALL_BOOKS)}
        show={page === 'books'}
      />

      <NewBook mutation={addBook}
        show={page === 'add'}
      />

    </div>
  )
}

export default App
