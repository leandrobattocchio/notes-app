import React, { useState } from 'react'
import Notes from '../../components/note-container/Notes'
import NoteModal from '../../components/note-modal/NoteModal'

const Inicio = () => {
  const [showModal, setShowModal] = useState(false)
  const [noteModal, setNoteModal] = useState({})

  const handleModal = ({ username, src, content, index, important, id, userId }) => {
    if (showModal) {
      setShowModal(prevState => !prevState)
    } else {
      setShowModal(prevState => !prevState)
      setNoteModal({ username, src, content, index, important, id, userId })
    }
  }

  return (
    <>
      {showModal && <NoteModal handleModal={handleModal} noteInfo={noteModal} />}
      <Notes handleModal={handleModal} />
    </>
  )
}

export default Inicio
