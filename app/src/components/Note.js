import React from 'react'
import { useNote } from '../hooks/useNote'

function Note ({ nota }) {
  const { handleChangeImportant, important, disabled } = useNote(nota)

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
