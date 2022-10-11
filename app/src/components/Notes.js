
import React, { useState, useEffect } from 'react'
import Note from './Note'
import axios from 'axios'
import Togglable from './Togglable'

function Notes ({ logged, setLogged }) {
  const [notes, setNotes] = useState([''])
  const [noteContent, setNoteContent] = useState('')

  async function handleSendNote (event) {
    event.preventDefault()

    const user = JSON.parse(logged)
    const { token } = user

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await axios.post('/api/notes', { content: noteContent }, config)
      setNotes(prevNotes => prevNotes.concat(data))
      setNoteContent('')
    } catch (error) {
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
    <div className='album py-5 bg-light' style={{ position: 'flex' }}>
      <div className='container'>
        {notes !== []
          ? (
            <Togglable buttonLabel='notes'>

              {notes.map((nota) => <Note key={nota.id} nota={nota} />)}

            </Togglable>
            )
          : (
              'Cargando...'
            )}
        <Togglable buttonLabel='notes form'>
          {logged
            ? (
              <form onSubmit={handleSendNote}>
                <input
                  placeholder='content de la nota...'
                  type='text'
                  value={noteContent}
                  onChange={({ target }) => setNoteContent(target.value)}
                />
                <button>Enviar nota</button>
              </form>)
            : <h2>Para enviar notas debe loguearse...</h2>}
        </Togglable>
      </div>
    </div>
  )
}

export default React.memo(Notes)
