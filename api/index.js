require('dotenv').config()

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const express = require('express')
const app = express()
const cors = require('cors')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const loginRouter = require('./controllers/login')
const errorDictionary = require('./middlewares/errorDictionary')
const notFound = require('./middlewares/notFound')

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

Sentry.init({
  dsn: 'https://e2a3459c894d4210a38c16469e54bf76@o1421404.ingest.sentry.io/6767076',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ]
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.get('/', (request, response, next) => {
  response.status(200).json('Hello!').end()
})

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/routerTest')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(errorDictionary)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
