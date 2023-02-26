const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')
const { DB_CONNECT, DB_DISCONNECT } = require('../mongo')

notesRouter.get('/', (request, response, next) => {
  DB_CONNECT()
    .then(() => {
      Note.find({}).populate('user', {
        username: 1,
        name: 1
      })
        .then(notes => {
          response.status(200).json(notes).end()
          DB_DISCONNECT()
        })
        .catch(next)
    })
    .catch(next)
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  DB_CONNECT()
    .then(() => {
      Note.findById(id).then(note => {
        if (note) {
          response.status(200).json(note).end()
        } else {
          response.status(404).end()
        }
        DB_DISCONNECT()
      }).catch(next)
    })
    .catch(next)
})

notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params

  DB_CONNECT()
    .then(() => {
      Note.findByIdAndDelete(id)
        .then(() => {
          response.status(204).end()
          DB_DISCONNECT()
        })
        .catch(next)
    })
    .catch(next)
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body

  if (!content) {
    return response
      .status(400)
      .json({ error: 'Es necesario que la nota tenga content' })
      .end()
  }

  const { userId } = request

  DB_CONNECT()
    .then(async () => {
      const user = await User.findById(userId)

      const newNote = new Note({
        content,
        date: new Date(),
        important,
        user: userId
      })
      newNote.save()
        .then(savedNote => {
          user.notes = user.notes.concat(newNote._id)
          user.save().then(() => {
            savedNote.populate('user', {
              username: 1,
              name: 1
            }).then(() => {
              response.status(201).json(savedNote).end()
            })
            DB_DISCONNECT()
          })
        })
        .catch(next)
    })
    .catch(next)
})

notesRouter.put('/:id', async (request, response, next) => {
  const note = request.body
  const { id } = request.params
  console.log(id)

  if (!note.content) {
    return response
      .status(400)
      .json({ error: 'Es necesario que la nota tenga content' })
      .end()
  }

  DB_CONNECT()
    .then(async () => {
      const user = await User.findById(note.user)

      const newNoteInfo = {
        content: note.content,
        date: new Date(),
        important: note.important,
        user: user.id
      }

      Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .populate('user', {
          username: 1,
          name: 1
        })
        .then(result => {
          response.status(200).json(result).end()
          DB_DISCONNECT()
        })
        .catch(next)
    })
    .catch(next)
})

module.exports = notesRouter
