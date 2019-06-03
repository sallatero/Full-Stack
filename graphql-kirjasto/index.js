const { ApolloServer, UserInputError, 
  AuthenticationError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_KEY'
const pubSub = new PubSub()

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

const resolvers = {
  Query: {
    bookCount: () => {
      return Book.collection.countDocuments()
    },
    authorCount: () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      //If genre specified, filter the books
      let books = []
      if (args.genre !== '') {
        console.log('allBooks: Book.find')
        books = await Book.find({ genres: { $in: [args.genre] }})
         .populate('author', { name: 1, born: 1, id: 1 })
      } else {
        console.log('allBooks: Book.find')
        books = await Book.find({})
         .populate('author', { name: 1, born: 1, id: 1 })
      }
      //console.log(books)
      return books
    },
    allGenres: async () => {
      console.log('allGenres: Book.distinct')
      const genres = await Book.distinct('genres')
      //console.log(genres)
      return genres
    },
    allAuthors: async () => {
      //Fetch all authors
      console.log('allAuthors: Author.find')
      const authorList = await Author.find({})
      //Fetch all books
      console.log('allAuthors: Book.find')
      const bookList = await Book.find({})
      const mappedBooks = bookList.map(b => {
        let bo = b._doc
        return bo
      })
      //Go throug all authors and update their bookCount
      const mappedAuthors = authorList.map(a => {
        let aut = a._doc
        aut.id = aut._id
        delete aut._id
        delete aut.__v
        const books = mappedBooks.filter(b => b.author.toString() === aut.id.toString())
        aut.bookCount = books.length
        //console.log('author: ', aut)
        //console.log('books: ', books)
        return aut
      })
      return mappedAuthors
    },
    me: (root, args, context) => {
      const mina = context.currentUser
      //console.log('mina ', mina)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      //console.log('addBook args: ', args)
      //Check user authentication
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      //If author doesn't exist in db yet, create it
      try {
        const authorQuery = await Author.find({ name: args.author })
        let authorObject = authorQuery[0]
        if (!authorObject) {
          const author = new Author({ name: args.author })
          const authorSaved = await author.save()
          authorObject = authorSaved
        }
        //console.log('authorObject: ', authorObject)

        //Create new book and link it to the correct author
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres
        })
        book.author = authorObject._id
        const bookSaved = await book.save()

        //Update author-field to the full object
        bookSaved.author = authorObject
        //console.log('bookSaved: ', bookSaved)
        //Publish new book addition
        pubSub.publish('BOOK_ADDED', { bookAdded: bookSaved })
        return bookSaved
      } catch (error) {
        console.log(error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args
       }) 
      }
    },
    updateAuthorBirthYear: async (root, args, context) => {
      console.log('updateAuthorBorthYear args: ', args)
      //Check user authentication
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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
        updatedAuthor.bookCount = args.bookCount
        console.log('updatedAuthor: ', updatedAuthor)
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
       })
      } 
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
       })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      //console.log('decoded token', decodedToken)
      const currentUser = await User.findById(decodedToken.id)
      //console.log('current user ', currentUser)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})