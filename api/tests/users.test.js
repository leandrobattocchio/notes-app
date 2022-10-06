const { server } = require('../index')
const User = require('../models/User')
const { initialUsers, api, getAllUsers } = require('./helpers')
const bcrypt = require('bcrypt')

const { DB_CONNECT, DB_DISCONNECT } = require('../mongo')

describe('tests users requets', () => {
  beforeEach(async () => {
    await DB_CONNECT()
    await User.deleteMany({})

    for (const user of initialUsers) {
      const saltRounds = 10
      const passwordHashed = await bcrypt.hash(user.password, saltRounds)

      const userObject = new User({
        username: user.username,
        name: user.name,
        passwordHash: passwordHashed
      })

      await userObject.save()
    }
    await DB_DISCONNECT()
  })

  test('get all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('post a user correctly', async () => {
    const { response: firstUsers } = await getAllUsers()
    const beginUsers = firstUsers.body

    const newUser = {
      username: 'Soy un nuevo usuario',
      name: 'nuevo usuario',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response: secondUsers } = await getAllUsers()
    const endUsers = secondUsers.body

    expect(endUsers).toHaveLength(beginUsers.length + 1)
  })

  test('cant create a user with an username already in use', async () => {
    const newUser = {
      username: 'GatitoConRulitos',
      name: 'USUARIO DUPLICADO',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const { response: lastUsers } = await getAllUsers()

    expect(initialUsers).toHaveLength(lastUsers.body.length)
  })

  test('user logged correctly', async () => {
    const firstUser = initialUsers[0]

    await api
      .post('/api/login')
      .send(firstUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  afterAll(() => {
    DB_DISCONNECT()
    server.close()
  })
})
