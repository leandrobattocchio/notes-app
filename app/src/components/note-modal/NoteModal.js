import React from 'react'
import { useNote } from '../../hooks/useNote'
import './note-modal.css'

const NoteModal = ({ handleModal, noteInfo }) => {
  const { handleChangeImportant, disabled, important } = useNote(noteInfo)
  return (
    <div className='modal modal-sheet d-block bg-secondary py-5 modal-container' tabIndex='-1' role='dialog' id='modalSheet'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content rounded-4 shadow'>
          <img src={noteInfo.src} />
          <div className='modal-body py-0 note-modal-title'><b style={{ display: 'inline' }}>Autor: </b><p style={{ display: 'inline' }}> {noteInfo.username}</p></div>
          <div className='modal-body py-0 note-modal-text'><p>{noteInfo.content}</p></div>
          <div className='modal-footer flex-column border-top-0'>
            <button type='button' className='btn btn-lg btn-light w-100 mx-0' data-bs-dismiss='modal' disabled={disabled} onClick={handleChangeImportant} id='send-note-button'>{important ? 'Importante' : 'No importante'}</button>
          </div>
          <div className='button-close-modal-note'><button onClick={handleModal}>x</button></div>
        </div>
      </div>
    </div>
  )
}

export default NoteModal
