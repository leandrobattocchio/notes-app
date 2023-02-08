const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { DB_CONNECT, DB_DISCONNECT } = require('../mongo')

usersRouter.post('/', async (request, response, next) => {
  const user = request.body
  const saltRounds = 10
  const passwordHashed = await bcrypt.hash(user.password, saltRounds)

  DB_CONNECT()
    .then(() => {
      const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash: passwordHashed
      })

      newUser.save()
        .then(savedUser => {
          response.status(201).json(savedUser).end()
          DB_DISCONNECT()
        })
        .catch(error => {
          response.status(400).json(error.errors.username.message).end()
          DB_DISCONNECT()
        })
    })
    .catch(next)
})

usersRouter.get('/', (request, response, next) => {
  DB_CONNECT()
    .then(async () => {
      const users = await User.find({}).populate('notes', {
        content: 1,
        date: 1
      })
      response.status(200).json(users).end()
      DB_DISCONNECT()
    })
    .catch(next)
})

module.exports = usersRouter
