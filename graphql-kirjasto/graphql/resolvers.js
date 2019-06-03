const { UserInputError, 
  AuthenticationError, PubSub } = require('apollo-server')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const pubSub = new PubSub()
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_KEY'

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

module.exports = resolvers