import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const useNote = (nota) => {
  const [important, setImportant] = useState(nota.important)
  const [disabled, setDisabled] = useState(false)
  const token = useSelector(state => state.token)

  useEffect(() => {
    if (token) {
      const user = JSON.parse(token)
      const { username } = user

      if (username !== nota.user.username) setDisabled(true)
      else setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [token])

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

  return {
    handleChangeImportant,
    disabled,
    important
  }
}
