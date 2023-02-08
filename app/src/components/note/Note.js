import React from 'react'
import nota1 from '../../images/nota1.png'
import nota2 from '../../images/nota2.png'
import nota3 from '../../images/nota3.png'
import nota4 from '../../images/nota4.png'
import nota5 from '../../images/nota5.png'
import nota6 from '../../images/nota6.png'

import './note.css'

function Note ({ nota, index, handleModal }) {
  const notesImg = [nota1, nota2, nota3, nota4, nota5, nota6]

  return (
    <>
      {nota.user
        ? (
          <div className='note-container' onClick={() => handleModal({ username: nota.user.username, src: notesImg[nota.numberImg], index, content: nota.content, important: nota.important, id: nota.id, userId: nota.user.id })}>
            <img src={notesImg[nota.numberImg]} />
            <div className='text-number'>N° {index}</div>
            <div className='text-author'>Autor: {nota.user.username}</div>
          </div>
          )
        : 'Cargando...'}
    </>
  )
}

export default React.memo(Note)
