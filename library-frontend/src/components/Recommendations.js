import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Container, Header, Table, Segment } from 'semantic-ui-react'

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

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const client = useApolloClient()
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('Recommendations useEffect 1 called')
    async function fetchUser() {
      console.log('Recommendations useEffect 1: fetching user')
      const { data } = await client.query({
        query: USER
      })
      console.log('Recommendations useEffect 1: setUser')
      setUser(data.me)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    console.log('Recommendations useEffect 2 called')
    async function fetchBooks() {
      console.log('Recommendations useEffect 2: fetching books by genre')
      const { data } = await client.query({
        query: ALL_BOOKS,
        variables: { genre: user.favoriteGenre },
        fetchPolicy: 'network-only'
      })
      console.log('Recommendations useEffect 2: setBooks')
      setBooks(data.allBooks)
    }
    if (user) {
      console.log('Recommendations useEffect 2: user exists -> fetch books')
      fetchBooks()
    }
  }, [user, props.show])

  if (!props.show) {
    return null
  }

  return (
    <Container text>
      <Segment.Group>
        <Segment padded>
          <Header size='large' color='teal'>Recommended for you</Header>
        </Segment>
        <Segment.Group>
          <Segment padded>
            <Header size='medium' color='teal'>Books in your favorite genre <i>{user.favoriteGenre}</i></Header>
            <Table color='teal' compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Author</Table.HeaderCell>
                  <Table.HeaderCell>Published</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {books.map(b =>
                  <Table.Row key={b.id}>
                    <Table.Cell>{b.title}</Table.Cell>
                    <Table.Cell>{b.author.name}</Table.Cell>
                    <Table.Cell>{b.published}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </Container>
  )
}

export default Recommendations