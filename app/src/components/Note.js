import React, { useState } from 'react'
import axios from 'axios'

function Note ({ nota }) {
  const [important, setImportant] = useState(nota.important)
  const handleChangeImportant = async () => {
    const newNote = {
      content: nota.content,
      important: !important
    }
    setImportant(!important)
    await axios
      .put(`/api/notes/${nota.id}`, newNote)
  }

  return (
    nota.user
      ? (
        <div className='col'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <p className='card-text'>{nota.content}</p>
              <p><b>Author: </b>{nota.user.name}</p>
            </div>
            {important ? <button onClick={handleChangeImportant}>importante</button> : <button onClick={handleChangeImportant}>no importante</button>}
          </div>
        </div>
        )
      : 'Cargando...'

  )
}

export default React.memo(Note)
