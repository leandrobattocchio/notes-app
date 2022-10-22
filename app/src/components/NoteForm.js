
import React, { useState } from 'react'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { postNote } from '../services/notesService'

function NoteForm () {
  const [noteContent, setNoteContent] = useState('')
  const [disabled, setDisabled] = useState(false)
  const token = useSelector(state => state.token)

  const dispatch = useDispatch()

  async function handleSendNote (event) {
    event.preventDefault()
    setDisabled(true)
    const user = JSON.parse(token)
    const { token: tokenUser } = user

    const config = {
      headers: {
        Authorization: `Bearer ${tokenUser}`
      }
    }

    try {
      postNote(noteContent, config)
        .then((note) => {
          dispatch({ type: '@notes/postNote', payload: note })
          setNoteContent('')
          setDisabled(false)
        })
        .catch(error => {
          console.log(error)
          setDisabled(false)
        })
    } catch (error) {
      setDisabled(false)
      console.log(error)
    }
  }

  return (
    <Togglable buttonLabel='notes form'>
      {token
        ? (
          <form onSubmit={handleSendNote}>
            <div className='grid'>
              <input
                required='required'
                placeholder='Contenido de la nota...'
                type='text'
                value={noteContent}
                onChange={({ target }) => setNoteContent(target.value)}
              />
              <button aria-busy={disabled}>Enviar nota</button>
            </div>
          </form>)
        : <h2>Para enviar notas debe loguearse...</h2>}
    </Togglable>
  )
}

export default NoteForm
