import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import UpdateAuthorForm from './components/UpdateAuthorForm';

const App = () => {
  const [page, setPage] = useState('authors')

  //poistettu kenttä bookCount
  const ALL_AUTHORS = gql`
    {
      allAuthors {
        name
        born
        id
      }
    }
  `
  //poistettu kenttö author
  const ALL_BOOKS = gql`
    {
      allBooks {
        title
        author {
          name
          born
          id
        }
        published
        id
      }
    }
  `
  const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int, $author: String!, $born: Int, $genres: [String!]!) {
      addBook(
        title: $title,
        published: $published,
        author: $author,
        born: $born,
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

    
      <Authors result={useQuery(ALL_AUTHORS)}
        show={page === 'authors'}
      />
      <UpdateAuthorForm result={useQuery(ALL_AUTHORS)} updateBirthYear={updateBirthYear}
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
