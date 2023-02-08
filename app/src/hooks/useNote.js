import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { putNote } from '../services/notesService'

export const useNote = (nota) => {
  const [important, setImportant] = useState(nota.important)
  const [disabled, setDisabled] = useState(false)
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      const user = JSON.parse(token)
      const { username } = user

      if (username !== nota.username) setDisabled(true)
      else setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [token])

  const handleChangeImportant = async () => {
    setDisabled(true)
    const newNote = {
      content: nota.content,
      important: !important,
      user: nota.userId
    }
    // Recordar cambiar importancia directamente con la respuesta de la llamada
    const updatedNote = await putNote(newNote, nota.id)
    dispatch({ type: '@notes/putNote', payload: updatedNote })
    setDisabled(false)
    setImportant(!important)
  }

  return {
    handleChangeImportant,
    disabled,
    important
  }
}
