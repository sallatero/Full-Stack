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

const ALL_GENRES = gql`
    query allGenres {
      allGenres
    }
  `

const Books = (props) => {
  const [selectedGenre, setselectedGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const client = useApolloClient()

  console.log('Books props: ', props)

  //useEffect to fetch all available genres
  useEffect(() => {
    console.log('Booklist useEffect 1 called')

    const fetchGenres = async () => {
      console.log('Booklist useEffect 1: fetching available genres')
      const { data } = await client.query({
        query: ALL_GENRES
      })
      setGenres(data.allGenres)
    }

    fetchGenres()
  }, [])

  //useEffect to fetch all books by selected genre
  useEffect(() => {
    console.log('Booklist useEffect 2 called ')

    const fetchBooks = async () => {
      console.log('Booklist useEffect 2: books by selected genre ', selectedGenre)
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: selectedGenre }
      })
      //console.log('observableQuery ', observableQuery)
      //console.log('currentResult ', observableQuery.getCurrentResult())

      setBooks(data.allBooks)
    }
    fetchBooks()
  }, [selectedGenre, props.show])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>

      {selectedGenre === '' 
      ? <div><h3>Filter by genre</h3></div>
      : <div><h3>Books in genre {selectedGenre}</h3></div>
      }
      {genres !== []
      ?
      <div><div>
        {genres.map(g =>
          <button key={g} onClick={() => setselectedGenre(g)}>{g}</button>
        )}
      </div>
      <div>
        <button onClick={() => setselectedGenre('')}>Show all</button></div
      ></div>
      :
      <div/>
      }
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

export default Books