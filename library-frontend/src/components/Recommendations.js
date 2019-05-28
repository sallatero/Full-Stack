import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
      allBooks(author: $author, genre: $genre) {
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

const USER = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`

/*
  const fetchUser = async () => {
    console.log('fetching user')
    const { data } = await client.query({
      query: USER
    })
    console.log('data ', data)
    return data.me
    //setUser(data.me)
    //console.log('user ', data.me)
  } */

  /*
  const fetchBooks = async () => {
    console.log('fetching books')
    const { data } = await client.query({
      query: ALL_BOOKS,
      variables: { genre: user.favoriteGenre }
    })
    setBooks(data.allBooks)
  } */

//useEffect to fetch current user and books by user's favorite genre

  /*
  useEffect(() => {
    const usr = fetchUser()
    console.log('usr ', usr) //Promise pending
    setUser(usr)
    fetchBooks()
    console.log('after fetching user ', user)
  }, []) */

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const client = useApolloClient()
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('1. effect, fetching user')
    async function fetchUser() {
      const { data } = await client.query({
        query: USER
      })
      console.log('found data ', data)
      setUser(data.me)
    }
    fetchUser()
    console.log('initialized user ', user)
  }, [])

  useEffect(() => {
    console.log('2. effect')
    async function fetchBooks() {
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: user.favoriteGenre }
      })
      console.log('found data ', data)
      setBooks(data.allBooks)
    }
    if (user) {
      console.log('user exists -> fetch books')
      fetchBooks()
    }
    console.log('initialized books ', books)
  }, [user])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommended for you</h2>
      <h3>Books in your favorite genre {user.favoriteGenre}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations