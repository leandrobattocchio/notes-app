const testingRouter = require('express').Router()
const User = require('../models/User')
const Note = require('../models/Note')
const { DB_CONNECT, DB_DISCONNECT } = require('../mongo')

testingRouter.post('/reset', async (request, response, next) => {
  DB_CONNECT()
    .then(async () => {
      await User.deleteMany({})
      await Note.deleteMany({})
      response.status(204).end()
      DB_DISCONNECT()
    })
    .catch(next)
})

module.exports = testingRouter
