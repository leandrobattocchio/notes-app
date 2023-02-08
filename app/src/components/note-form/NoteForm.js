
import React, { useState } from 'react'
import Togglable from '../togglable/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { postNote } from '../../services/notesService'
import './note-form.css'

function NoteForm () {
  const [noteContent, setNoteContent] = useState('')
  const [disabled, setDisabled] = useState(false)
  const token = useSelector(state => state.token)

  const dispatch = useDispatch()

  async function handleSendNote (event) {
    event.preventDefault()
    setDisabled(true)
    let maxLength = false
    const user = JSON.parse(token)
    const { token: tokenUser } = user

    const config = {
      headers: {
        Authorization: `Bearer ${tokenUser}`
      }
    }

    noteContent.split(' ').map((word) => {
      return word.length > 19 && (maxLength = true)
    })

    if (!maxLength) {
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
    } else {
      console.log('Error al enviar, has ingresado una palabra demasiado larga')
      setDisabled(false)
    }
  }

  return (
    <Togglable buttonLabel='notes form'>
      {token
        ? (
          <form onSubmit={handleSendNote}>
            <div className='post-note'>
              <textarea
                required='required'
                type='text'
                placeholder='Ingresa tu nota aqui...'
                maxLength='660'
                value={noteContent}
                onChange={({ target }) => setNoteContent(target.value)}
              />
              <button disabled={disabled}>Enviar nota</button>
            </div>
          </form>)
        : <h2>Para enviar notas debe loguearse...</h2>}
    </Togglable>
  )
}

export default NoteForm
