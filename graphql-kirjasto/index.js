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
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book
    updateAuthorBirthYear(
      id: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log('allBooks query')
      
      //If genre specified, filter the books
      let books = []
      if (args.genre) {
        books = await Book.find({ genres: { $in: [args.genre] }})
         .populate('author', { name: 1, born: 1, id: 1 })
      } else {
        books = await Book.find({})
         .populate('author', { name: 1, born: 1, id: 1 })
      }
      return books
    },
    allAuthors: async () => {
      console.log('allAuthors query')
      return Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      //const authorsBooks = books.filter(b => b.author === root.name)
      const authorsBooks = await Book.find({ author: root._id })
      return authorsBooks.length
    } 
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('addBook args: ', args)

      //If author doesn't exist in db yet, create it
      const authorQuery = await Author.find({ name: args.author })
      let authorObject = authorQuery[0]
      if (!authorObject) {
        const author = new Author({ name: args.author })
        const authorSaved = await author.save()
        authorObject = authorSaved
      }
      console.log('authorObject: ', authorObject)

      //Create new book and link it to the correct author
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres
      })
      book.author = authorObject._id
      try {
        const bookSaved = await book.save()
        //Update author-field to the full object
        bookSaved.author = authorObject   
        return bookSaved
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
       }) 
      }
    },
    updateAuthorBirthYear: async (root, args) => {
      console.log('updateAuthorBorthYear args: ', args)
      
      let authorObject = await Author.findById(args.id)
      if (!authorObject) {
        console.log('Author id not valid')
        throw new UserInputError('author id not valid', { invalidArgs: args })
        //return null
      }
      const newVersion = authorObject
      console.log('newVersion: ', newVersion)
      newVersion.born = args.setBornTo
      console.log('newVersion 2: ', newVersion)
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(authorObject._id, newVersion, { new: true })
        console.log('updatedAuthor: ', updatedAuthor)
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
       })
      } 
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})