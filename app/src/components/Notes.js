
import React, { useEffect } from 'react'
import Note from './Note'
import axios from 'axios'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from './NoteForm'

function Notes () {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/api/notes/')
      .then((response) => {
        const { data } = response
        dispatch({ type: 'getNotes', payload: data })
      })
      .catch(error => console.log(error))
  }, [])

  console.log(state)

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>APLICACION DE NOTAS</h1>
      {state.notes !== []
        ? (
          <Togglable buttonLabel='notes' style='row row-example'>
            {state.notes.map((nota) => <Note key={nota.id} nota={nota} token={state.token} />)}
          </Togglable>
          )
        : ('Cargando...')}
      <NoteForm />
    </div>

  )
}

export default React.memo(Notes)
