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
    <div className='container-fluid'>
      <Link to='/'>Home</Link>
      {token
        ? <a style={{ float: 'right' }} onClick={handleLogout}> Desloguearse</a>
        : [
          <Link style={{ float: 'right', marginLeft: '25px' }} key='login' to='/login'>Login</Link>,
          <Link style={{ float: 'right' }} key='register' to='/register'>Register</Link>
          ]}

    </div>
  )
}

export default Header
