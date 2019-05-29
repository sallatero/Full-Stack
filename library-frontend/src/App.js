import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import UpdateAuthorForm from './components/UpdateAuthorForm'
import { Subscription } from 'react-apollo'
import BOOK_ADDED from './graphql/subscriptions/bookAdded'
//import AUTHOR_ADDED from './graphql/subscriptions/authorAdded'

const ErrorNotification = (props) => { 
  if(props.message) {
    return (
      <div style={{ color: 'red' }}>
        {props.message}
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
  
  //Initializing logged in user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('library-user-token')
    console.log('logged user', loggedUser)
    if(loggedUser) {
      setToken(loggedUser)
      //setToken(loggedUser.token)
    }
  }, [])

  const handleError = (error) => {
    console.log('handling error', error.message)
    setErrorMessage(error.message)
    if (error.message.includes('not authenticated')) {
      logout()
    }
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
    query allBooksByGenre {
      allBooks {
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
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
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
          id
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

  const includedIn = (set, object) => {
    console.log('included in?: ', set, object)
    console.log('set length: ', set.length)
    const setIds = set.map(p => {
      console.log('mapissa: ', p.id)
      return p.id
    })
    console.log('set ids: ', setIds)
    const bool = setIds.includes(object.id)
    console.log('boolean: ', bool)
    return bool
  }

  const addBook = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      //After book add, add it to the store if not already there
      console.log('addBok update response: ', response)
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      const addedBook = response.data.addBook
      console.log('addedBook: ', addedBook)
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        dataInStore.allBooks.push(addedBook)
        client.writeQuery({
          query: ALL_BOOKS,
          data: dataInStore
        })
      }
    }
  })
  const updateBirthYear = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const login = useMutation(LOGIN)

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  return (
    <div>
      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({ subscriptionData }) => {
          const addedBook = subscriptionData.data.bookAdded
          window.alert(`New book ${addedBook.title} added`)
          const boooksInStore = client.readQuery({ query: ALL_BOOKS })
          if (!includedIn(boooksInStore.allBooks, addedBook)) {
            const newSet = boooksInStore.allBooks.concat(addedBook)
            boooksInStore.allBooks = newSet
            //console.log('new book data going to store ', boooksInStore)
            client.writeQuery({
              query: ALL_BOOKS,
              data: boooksInStore
            })
          }
          const author = addedBook.author
          const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
          //Add author to store if not there already
          if (!includedIn(authorsInStore.allAuthors, author)) {
            author.bookCount = 1
            const newSet = authorsInStore.allAuthors.concat(author)
            authorsInStore.allAuthors = newSet
            //console.log('author not in store -> writing', authorsInStore)
            client.writeQuery({
              query: ALL_AUTHORS,
              data: authorsInStore
            })
          } else {
            //Update author's book count
            const newSet = authorsInStore.allAuthors.map(a => {
              if (a.id === author.id) {
                const temp = { ...a }
                temp.bookCount = a.bookCount + 1
                return temp   
              } else {
                return a
              }
            })
            authorsInStore.allAuthors = newSet
            //console.log('writing to store, new set', authorsInStore)
            client.writeQuery({
              query: ALL_AUTHORS,
              data: authorsInStore
            })
          }
        }}>
        {() => null}
        </Subscription>
      {token     
      ? <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommended</button>
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
      ? <div>
        <NewBook addBook={addBook} handleError={handleError}
          show={page === 'add'} setPage={() => setPage('books')}
        />
        <Recommendations show={page === 'recommendations'}/></div>
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
