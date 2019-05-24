import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import UpdateAuthorForm from './components/UpdateAuthorForm';
import { onError } from 'apollo-link-error';

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    console.log(error)
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const ALL_AUTHORS = gql`
    query allAuthors {
      allAuthors {
        name
        born
        bookCount
        id
      }
    }
  `

  const ALL_BOOKS = gql`
    query allBooksByGenre($genre: String) {
      allBooks(genre: $genre) {
        title
        author {
          name
          born
          id
        }
        genres
        published
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
        genres
        id
        author {
          name
          born
        }
      }
    }
  `
  const UPDATE_AUTHOR_BORN = gql`
    mutation updateAuthorBirthYear($id: String!, $setBornTo: Int!) {
      updateAuthorBirthYear(
        id: $id,
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
  const updateBirthYear = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <div>
        { errorMessage && 
          <div style={{ color: 'red' }}>
            { errorMessage }
          </div>}
      </div>

    
      <Authors result={useQuery(ALL_AUTHORS)}
        show={page === 'authors'}
      />
      <UpdateAuthorForm result={useQuery(ALL_AUTHORS)} updateBirthYear={updateBirthYear}
        handleError={handleError}
        show={page === 'authors'}
      />

      <Books result={useQuery(ALL_BOOKS)}
        show={page === 'books'}
      />

      <NewBook addBook={addBook} handleError={handleError}
        show={page === 'add'}
      />

    </div>
  )
}

export default App
