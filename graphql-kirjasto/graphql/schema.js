const { gql } = require('apollo-server')

const typeDefs = gql`
type Author {
  name: String!
  born: Int,
  bookCount: Int!
  id: ID!
}  
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
type Subscription {
  bookAdded: Book!
}
type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allGenres: [String!]!
  allAuthors: [Author!]!
  me: User
}
type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  ): Book
  updateAuthorBirthYear(
    id: String!
    setBornTo: Int!
    bookCount: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`
module.exports = { typeDefs }