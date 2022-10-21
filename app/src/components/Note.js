import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Note ({ nota, token }) {
  const [important, setImportant] = useState(nota.important)
  const [disabled, setDisabled] = useState(false)

  const handleChangeImportant = async () => {
    setDisabled(true)
    const newNote = {
      content: nota.content,
      important: !important
    }

    // Recordar cambiar importancia directamente con la respuesta de la llamada
    await axios
      .put(`/api/notes/${nota.id}`, newNote)
    setDisabled(false)
    setImportant(!important)
  }

  useEffect(() => {
    if (token) {
      const user = JSON.parse(token)
      const { username } = user
      if (nota.user) {
        if (username !== nota.user.username) {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
      }
    } else {
      setDisabled(true)
    }
  }, [token])

  return (
    nota.user
      ? (
        <div>
          <b>A͟u͟t͟o͟r: </b> <strong>{nota.user.username}</strong>
          <br />
          <b>I͟m͟p͟o͟r͟t͟a͟n͟t͟e: {important ? 'Si' : 'No'}</b>
          <div className='grid'>
            <b>C͟o͟n͟t͟e͟n͟i͟d͟o: {nota.content}</b>

            {important
              ? <button className='secondary' disabled={disabled} onClick={handleChangeImportant}>Importante</button>
              : <button className='secondary' disabled={disabled} onClick={handleChangeImportant}>No importante</button>}
          </div>

        </div>
        )
      : 'Cargando...'

  )
}

export default React.memo(Note)
