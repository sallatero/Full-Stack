import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Container, Header, Button, Label, Menu, Segment } from 'semantic-ui-react'
import _ from 'lodash'
import '../index.css'

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
        query: ALL_GENRES,
        fetchPolicy: 'network-only'
      })
      console.log('Booklist useEffect 1: setGenres')
      setGenres(data.allGenres)
    }
    fetchGenres()
  }, [books])

  //useEffect to fetch all books by selected genre
  useEffect(() => {
    console.log('Booklist useEffect 2 called ')
    const fetchBooks = async () => {
      console.log('Booklist useEffect 2: books by selected genre ', selectedGenre)
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: selectedGenre },
        fetchPolicy: 'network-only'
      })
      console.log('Booklist useEffect 2: setBooks')
      setBooks(data.allBooks)
    }
    fetchBooks()
  }, [selectedGenre, props.show])

  if (!props.show) {
    return null
  }

  const renderGenre = (genre) => {
    let color = ''
    if (selectedGenre === genre) {
      color = 'teal'
    }
    return (
      <Label key={genre} as='a' color={color} compact='true' size='small'
        onClick={() => setselectedGenre(genre)} >
        {genre === '' 
          ? 'Show all'
          : _.capitalize(genre)
          }
      </Label>
    )
  }

  const renderSubheader = () => { 
    return (
      <div>
        {selectedGenre === ''
        ? 'Filter by genre'
        : <div>Books in genre <i>{selectedGenre}</i></div>
        }
      </div>
    )
  }

  const renderFilters = () => {
    return (
      <div>
      <Header size='medium' color='teal' >
        {renderSubheader()}
      </Header>
      {genres !== [] ?
        <div className='genre filters'>
          <Label.Group>
            {renderGenre('')}
          </Label.Group>
          <Label.Group>
            {genres.map(g => renderGenre(g))}
          </Label.Group> 
        </div>
      : <div/> }
      </div>
    )
  }

  

  return (
    <Container text>
      <Segment.Group>
        <Segment padded>
          <Header size='large' color='teal'>Books</Header>
        </Segment>
        <Segment.Group>
          <Segment padded>
            {renderFilters()}
          </Segment>
          <Segment padded>
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
            </Segment>
          </Segment.Group>
      </Segment.Group>
    </Container>
  )
}

export default Books