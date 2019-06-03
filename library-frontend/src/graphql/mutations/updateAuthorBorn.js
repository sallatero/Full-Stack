import { gql } from 'apollo-boost'

const UPDATE_AUTHOR_BORN = gql`
    mutation updateAuthorBirthYear($id: String!, $setBornTo: Int!, $bookCount: Int!) {
      updateAuthorBirthYear(
        id: $id,
        setBornTo: $setBornTo,
        bookCount: $bookCount
      ){
        name
        born
        id
        bookCount
      }
    }
  `

  export default UPDATE_AUTHOR_BORN