//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const { tokenExtractor, errorHandler, unknownEndpoint, requestLogger } = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const logger = require('./utils/logger')

app.use(cors())
app.use(bodyParser.json())
app.use(requestLogger)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//Yhdistetään tietokantaan
logger.info('connecting to db at ', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB: ', error.message)
  })

app.use(tokenExtractor)

//Otetaan blogsRouter käyttöön ja käytetään sitä vain jos polun alku on /api/blogs
app.use('/api/blogs', blogsRouter)
//Otetaan usersRouter käyttöön ja käytetään sitä vain jos polun alku on /api/users
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app