const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const uuid = require('uuid/v1')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:vkf467dji@cluster0-epvqk.mongodb.net/library?retryWrites=true'
console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB: ', error.message)
})

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
bookCount: Int!

author: String, genre: String

 editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
*/

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
  }  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      born: Int
      genres: [String!]!
    ): Book
  }
`

/*
root, args
*/

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => {
      console.log('allBooks query')
      //let booksToReturn = books
      /*
      if(args.author) {
        booksToReturn = booksToReturn.filter(b => b.author === args.author)
      }
      if (args.genre) {
        booksToReturn = booksToReturn.filter(b => b.genres.includes(args.genre))
      }*/
      const books = Book.find({}).populate('author', { name: 1, born: 1, id: 1 })
      //console.log('books in db: ', books)
      return books
    },
    allAuthors: () => {
      console.log('allAuthors query')
      return Author.find({})
    }
  },
  /*
  Author: {
    bookCount: (root) => {
      const authorsBooks = books.filter(b => b.author === root.name)
      return authorsBooks.length
    } 
  },*/
  Mutation: {
    addBook: async (root, args) => {
      console.log('args: ', args)
      const author = new Author({
        name: args.author,
        born: args.born
      })
      const authorSaved = await author.save()
      console.log('authorSaved: ', authorSaved)
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: authorSaved.id
      })
      const bookSaved = await book.save()
      console.log('bookSaved: ', bookSaved)
      bookSaved.author = authorSaved
      //books = books.concat(book)
      //const author = Author.findOne({ name: })
      /*
      if (!(authors.find(a => a.name === args.author))) {
        const author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }*/
      return bookSaved
    }
    /*
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if(!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    } */
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})