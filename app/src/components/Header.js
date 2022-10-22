import React, { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(false)
  const token = useSelector(state => state.token)

  useEffect(() => {
    if (token) setLogin(true)
  }, [token])

  function handleSetLogin () {
    setLogin(prevState => !prevState)
  }

  return (
    <div className='container-fluid'>
      {token
        ? ''
        : <button onClick={handleSetLogin}>{login ? 'Registrarse' : 'Loguearse'}</button>}

      {login
        ? <Login dispatch={dispatch} />
        : <Register />}
    </div>
  )
}

export default Header
