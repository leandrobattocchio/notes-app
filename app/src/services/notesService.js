import axios from 'axios'

async function getNotes() {
  const response = await axios.get('/api/notes/')
  return response.data
}

async function postNote(noteContent, config) {
  const response = await axios.post('/api/notes', { content: noteContent }, config)
  return response.data
}

async function putNote(newNote, id) {
  const response = await axios.put(`/api/notes/${id}`, newNote)
  return response.data
}

export { getNotes, postNote, putNote }
