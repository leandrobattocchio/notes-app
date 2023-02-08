import React, { useState } from 'react'
import Proptypes from 'prop-types'
import './togglable.css'

export default function Togglable ({ children, buttonLabel, style = 'container-fluid' }) {
  const [visible, setVisible] = useState(true)
  const isVisible = { display: visible ? '' : 'none' }

  function handleVisible () {
    setVisible(prevState => !prevState)
  }
  return (
    <div className='togglable-notes'>
      <div className={style} data-testid='togglable' style={isVisible}>
        {children}
      </div>
      <button className='togglable-notes-button' onClick={handleVisible}>{visible ? 'Hide' : 'Show'} {buttonLabel}</button>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: Proptypes.string.isRequired
}
