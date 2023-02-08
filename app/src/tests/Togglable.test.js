import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Togglable from '../components/togglable/Togglable'

describe('Toggable tests', () => {
  const setup = () => {
    render(
      <Togglable buttonLabel='notes'>
        <div>Hola</div>
      </Togglable>)
  }

  beforeEach(() => {
    setup()
  })

  test('checking children togglable is extisting', () => {
    screen.getByText('Hola')

    const button = screen.getByText('Hide notes')
    fireEvent.click(button)
    screen.getByText('Show notes')
  })
})
