import React from 'react'
import Note from '../note/Note'
import NoteForm from '../note-form/NoteForm'
import { useSelector } from 'react-redux'
import './notes.css'

function Notes ({ handleModal }) {
  const notes = useSelector(state => state.notes)

  return (
    <>
      <div className='notes-container'>
        {notes
          ? (
              notes.map((nota, i) => {
                return (
                  <Note nota={nota} key={i} index={i} handleModal={handleModal} />
                )
              })
            )
          : ('Cargando...')}
        <NoteForm />
      </div>
    </>
  )
}

export default React.memo(Notes)
