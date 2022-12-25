import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  function handleLogout () {
    dispatch({ type: '@token/logout' })
  }
  return (
    <header class='p-3 text-bg-dark'>
      <div class='container'>
        <div class='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <ul class='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <Link to='/'>Home</Link>
          </ul>
          <div class='text-end'>
            {token
              ? <button onClick={handleLogout}>Logout</button>
              : (
                <>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
                </>
                )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
