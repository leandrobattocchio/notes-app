
import React, { useState, useEffect } from 'react'
import Note from './Note'
import axios from 'axios'
import Togglable from './Togglable'

function Notes ({ logged, setLogged }) {
  const [notes, setNotes] = useState([''])
  const [noteContent, setNoteContent] = useState('')
  const [disabled, setDisabled] = useState(false)

  async function handleSendNote (event) {
    event.preventDefault()
    setDisabled(true)
    const user = JSON.parse(logged)
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

  useEffect(() => {
    axios
      .get('/api/notes/')
      .then((response) => {
        const { data } = response
        setNotes(data)
      })
      .catch(error => console.log(error))
  }, [setLogged])

  return (
    <div>
      {notes !== []
        ? (
          <Togglable buttonLabel='notes' style='row row-example'>
            {notes.map((nota) => <Note key={nota.id} nota={nota} token={logged} />)}
          </Togglable>
          )
        : ('Cargando...')}
      <Togglable buttonLabel='notes form'>
        {logged
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
