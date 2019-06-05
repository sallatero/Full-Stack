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


    /*
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
*/
export default ALL_BOOKS