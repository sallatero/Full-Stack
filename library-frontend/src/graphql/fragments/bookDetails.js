import { gql } from 'apollo-boost'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
      born
      id
    }
    published
    genres
  }
`

export default BOOK_DETAILS