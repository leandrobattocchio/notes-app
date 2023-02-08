
const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const initialUsers = [
  {
    username: 'GatitoConRulitos',
    name: 'Leandro Adrian',
    password: '12345'
  },
  {
    username: 'FakerRosarino',
    name: 'Leandro Esteban',
    password: 'asd123'
  }

]

const initialNotes = [
  {
    content: 'Soy la primera nota',
    important: true,
    date: new Date()
  },
  {
    content: 'Soy la segunda nota',
    important: false,
    date: new Date()
  },
  {
    content: 'Soy la tercer nota',
    important: false,
    date: new Date()
  }
]

async function getAllNotes () {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)
  return { contents, response }
}

async function getAllUsers () {
  const response = await api.get('/api/users')
  return { response }
}

module.exports = {
  api,
  initialNotes,
  initialUsers,
  getAllNotes,
  getAllUsers
}
