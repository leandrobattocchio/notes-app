import React, { useState } from 'react'
import Proptypes from 'prop-types'

export default function Togglable ({ children, buttonLabel }) {
  const [visible, setVisible] = useState(true)
  const isVisible = { display: visible ? '' : 'none' }

  function handleVisible () {
    setVisible(prevState => !prevState)
  }

  return (
    <div>
      <div data-testid='togglable' style={isVisible}>
        {children}
      </div>
      <button onClick={handleVisible}>{visible ? 'Hide' : 'Show'} {buttonLabel}</button>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: Proptypes.string.isRequired
}
