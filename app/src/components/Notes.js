
import React, { useState, useEffect } from 'react'
import Note from './Note'
import axios from 'axios'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
function Notes () {
  const state = useSelector(state => state)
  const [notes, setNotes] = useState([])
  const [noteContent, setNoteContent] = useState('')
  const [disabled, setDisabled] = useState(false)

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
      await axios.post('/api/notes', { content: noteContent }, config)
      axios
        .get('/api/notes/')
        .then((response) => {
          const { data } = response
          setNotes(data)
          setNoteContent('')
          setDisabled(false)
          window.scroll({ top: 2500, left: 0, behavior: 'smooth' })
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

  useEffect(() => async () => {
    try {
      const response = await axios.get('/api/notes/')
      const { data } = response
      setNotes(data)
    } catch (error) {
      console.log(error)
    }
  }, [state])

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>APLICACION DE NOTAS</h1>
      {notes !== []
        ? (
          <Togglable buttonLabel='notes' style='row row-example'>
            {notes.map((nota) => <Note key={nota.id} nota={nota} token={state.token} />)}
          </Togglable>
          )
        : ('Cargando...')}
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
    </div>

  )
}

export default React.memo(Notes)
