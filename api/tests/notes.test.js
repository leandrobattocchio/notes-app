const { server } = require('../index')
const Note = require('../models/Note')
const { initialNotes, api, getAllNotes, initialUsers } = require('./helpers')

const { DB_CONNECT, DB_DISCONNECT } = require('../mongo')

describe('tests requests', () => {
  beforeEach(async () => {
    await DB_CONNECT()
    await Note.deleteMany({})

    for (const note of initialNotes) {
      const noteObject = new Note(note)
      await noteObject.save()
    }
    await DB_DISCONNECT()
  })
  test('get all notes correctly', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('expects note have the correctly length', async () => {
    const { response } = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('expects note have the correctly content', async () => {
    const { contents } = await getAllNotes()
    expect(contents).toContain('Soy la segunda nota')
  })

  test('a note can be added', async () => {
    const firstUser = initialUsers[0]

    const { body } = await api.post('/api/login').send(firstUser)
    const commonHeaders = { authorization: `Bearer ${body.token}` }

    const newNote = {
      content: 'Nota de prueba',
      important: true,
      date: new Date()
    }

    await api
      .post('/api/notes')
      .set(commonHeaders)
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { contents } = await getAllNotes()

    expect(contents).toContain(newNote.content)
    expect(contents).toHaveLength(initialNotes.length + 1)
  })

  test('a note cant be added without content', async () => {
    const firstUser = initialUsers[0]

    const { body } = await api.post('/api/login').send(firstUser)
    const commonHeaders = { authorization: `Bearer ${body.token}` }

    const newNote = {
      important: true,
      date: new Date()
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .set(commonHeaders)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const { response } = await getAllNotes()

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('delete a note correctly', async () => {
    const { response: firstResponse } = await getAllNotes()
    const noteToDelete = firstResponse.body[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const { contents } = await getAllNotes()

    expect(contents).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('a note can not be delete', async () => {
    await api
      .delete('/api/notes/1234')
      .expect(400)

    const { response } = await getAllNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('put changes in a note', async () => {
    const newNote = {
      content: 'Nota cambiada',
      important: true,
      date: new Date()
    }
    const { response } = await getAllNotes()

    await api
      .put(`/api/notes/${response.body[0].id}`)
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { contents } = await getAllNotes()
    expect(contents).toContain(newNote.content)
  })

  afterAll(() => {
    DB_DISCONNECT()
    server.close()
  })
})
