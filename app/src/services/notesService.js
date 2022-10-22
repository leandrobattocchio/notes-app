import axios from 'axios'

async function getNotes () {
  const response = await axios.get('/api/notes/')
  return response.data
}

async function postNote (noteContent, config) {
  const response = await axios.post('/api/notes', { content: noteContent }, config)
  return response.data
}

export { getNotes, postNote }
