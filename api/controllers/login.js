const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { DB_CONNECT, DB_DISCONNECT } = require('../mongo')

loginRouter.post('/', (request, response, next) => {
  const { username, password } = request.body

  DB_CONNECT()
    .then(async () => {
      const user = await User.findOne({ username })

      try {
        if (!user) {
          throw new Error('username or password are invalid')
        }

        const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

        if (!passwordCorrect) {
          throw new Error('username or password are invalid')
        }
      } catch (error) {
        response.status(401).json({ error: 'username or password are invalid' }).end()
        DB_DISCONNECT()
      }

      const userToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userToken, process.env.SECRET)
      response.status(200).send({
        username: user.username,
        name: user.name,
        token
      })
      DB_DISCONNECT()
    })
    .catch(next)
})

module.exports = loginRouter
