const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/user')
const { typeDefs } = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_KEY'

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

const PORT = process.env.PORT || 4000

server.listen(PORT).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})