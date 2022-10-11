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
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' data-testid='togglable' style={isVisible}>
        {children}
      </div>
      <button className='btn btn-primary my-2' onClick={handleVisible}>{visible ? 'Hide' : 'Show'} {buttonLabel}</button>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: Proptypes.string.isRequired
}
