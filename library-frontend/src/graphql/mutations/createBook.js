import { gql } from 'apollo-boost'

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

export default CREATE_BOOK