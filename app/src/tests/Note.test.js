import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from '../components/note/Note'

test('render correctly a note', () => {
  const note = {
    content: 'nota de prueba',
    important: true
  }

  const note2 = {
    content: 'nota de prueba2',
    important: false
  }

  render(
    <div>
      <Note nota={note} />
      <Note nota={note2} />
    </div>)
  screen.getByText(note.content)
  screen.getByText('importante')

  screen.getByText(note2.content)
  screen.getByText('no importante')
})
