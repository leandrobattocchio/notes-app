import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  function handleLogout () {
    dispatch({ type: '@token/logout' })
  }
  return (
    <header className='p-3 text-bg-dark fixed-top header-note-app'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <Link to='/' id='home'>Home</Link>
          </ul>
          <div className='text-end login-logout-buttons'>
            {token
              ? <Link onClick={handleLogout} className='btn btn-secondary'>Logout</Link>
              : (
                <div className='login-panel'>
                  <Link to='/login' className='btn btn-secondary'>Login</Link>
                  <Link to='/register' className='btn btn-secondary'>Register</Link>
                </div>
                )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
