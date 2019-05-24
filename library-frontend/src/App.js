import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import UpdateAuthorForm from './components/UpdateAuthorForm'
import { onError } from 'apollo-link-error';

const ErrorNotification = (props) => { 
  if(props.errorMessage) {
    return (
      <div style={{ color: 'red' }}>
        {props.errorMessage}
      </div> 
    )
  }
  return null
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const handleError = (error) => {
    console.log(error)
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
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
  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(
        username: $username,
        password: $password
      ){
        value
      }
    }
  `

  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const updateBirthYear = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const login = useMutation(LOGIN)

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  return (
    <div>
      {token     
      ? <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
        </div>
      : <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        </div>
      }
      <ErrorNotification message={errorMessage}/>
      <Authors result={allAuthors}
          show={page === 'authors'}
      />
      {token     
      ? <div>
        <UpdateAuthorForm result={allAuthors} updateBirthYear={updateBirthYear}
          handleError={handleError}
          show={page === 'authors'}
        /></div>
      : <div/>
      }
      <Books result={allBooks}
        show={page === 'books'}
      />
      {token     
      ? 
        <NewBook addBook={addBook} handleError={handleError}
          show={page === 'add'}
        />
      :
        <LoginForm 
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)}
          handleError={handleError}
          setPage={() => setPage('authors')}
        />
      }
    </div>
  )
}

export default App
