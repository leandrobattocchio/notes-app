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
    <div>
      <div style={{ display: 'flex' }}>
        <p>{nota.content}</p>
        {important ? <button onClick={handleChangeImportant}>importante</button> : <button onClick={handleChangeImportant}>no importante</button>}
      </div>
    </div>
  )
}

export default React.memo(Note)
