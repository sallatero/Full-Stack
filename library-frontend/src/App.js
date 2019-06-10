import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { Subscription } from 'react-apollo'
import BOOK_ADDED from './graphql/subscriptions/bookAdded'
import CREATE_BOOK from './graphql/mutations/createBook'
import LOGIN from './graphql/mutations/login'
import ALL_BOOKS from './graphql/queries/allBooks'
import ALL_AUTHORS from './graphql/queries/allAuthors'
import { Container, Menu } from 'semantic-ui-react'

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

  const login = useMutation(LOGIN)

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  return (
    <Container>
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
      ? 
        <Menu secondary>
        <Menu.Item name='authors' active={page === 'authors'} 
          onClick={() => setPage('authors')}/>
        <Menu.Item name='books' active={page === 'books'} 
          onClick={() => setPage('books')}/>
        <Menu.Item name='add book' active={page === 'add'} 
          onClick={() => setPage('add')}/>
        <Menu.Item name='recommendations' active={page === 'recommendations'} 
          onClick={() => setPage('recommendations')}/>
        <Menu.Menu position='right'>
          <Menu.Item name='logout' active={false}
            onClick={() => logout()}/>
        </Menu.Menu>
        </Menu>

      :  <Menu secondary>
          <Menu.Item name='authors' active={page === 'authors'} 
            onClick={() => setPage('authors')}/>
          <Menu.Item name='books' active={page === 'books'} 
            onClick={() => setPage('books')}/>
          <Menu.Menu position='right'>
            <Menu.Item name='login'
              onClick={() => setPage('login')}/>
          </Menu.Menu>
        </Menu>
      }
      <ErrorNotification message={errorMessage}/>
      <Authors result={allAuthors} token={token} handleError={handleError}
          show={page === 'authors'}
      />
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
    </Container>
  )
}

export default App
