import React, { useEffect, useState } from 'react'
import Login from './Login'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(false)
  const state = useSelector(state => state)
  let token
  if (state) {
    token = state.token
  }

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'getToken' })
    } else {
      setLogin(true)
    }
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
