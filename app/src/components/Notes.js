
import React from 'react'
import Note from './Note'
import Togglable from './Togglable'
import NoteForm from './NoteForm'
import { useSelector } from 'react-redux'

function Notes () {
  const notes = useSelector(state => state.notes)

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>APLICACION DE NOTAS</h1>
      {notes
        ? (
          <Togglable buttonLabel='notes' style='row row-example'>
            {notes.map((nota) => <Note key={nota.id} nota={nota} />)}
          </Togglable>
          )
        : ('Cargando...')}
      <NoteForm />
    </div>

  )
}

export default React.memo(Notes)
