
import React, { useState } from 'react'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

function NoteForm () {
  const [noteContent, setNoteContent] = useState('')
  const [disabled, setDisabled] = useState(false)
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  async function handleSendNote (event) {
    event.preventDefault()
    setDisabled(true)
    const user = JSON.parse(state.token)
    const { token } = user
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      axios.post('/api/notes', { content: noteContent }, config)
        .then((response) => {
          const { data } = response
          dispatch({ type: 'postNote', payload: data })
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
      {state.token
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
