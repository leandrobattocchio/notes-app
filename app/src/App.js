import './App.css'
import Login from './components/Login'
import Notes from './components/Notes'
import { useEffect, useState } from 'react'
import Register from './components/Register'

function App () {
  const [userLogged, setUserLogged] = useState(null)
  const [login, setLogin] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setLogin(true)
      setUserLogged(token)
    }
  }, [])

  function handleSetLogin () {
    setLogin(prevState => !prevState)
  }

  return (
    <div className='container'>
      <div className='container-fluid'>
        {userLogged
          ? ''
          : <button onClick={handleSetLogin}>{login ? 'Registrarse' : 'Loguearse'}</button>}

        {login
          ? <Login logged={userLogged} setLogged={setUserLogged} />
          : <Register />}
      </div>
      <h1 style={{ textAlign: 'center' }}>APLICACION DE NOTAS</h1>
      <div className='container'>
        <Notes logged={userLogged} setLogged={setUserLogged} />
      </div>

    </div>
  )
}

export default App
