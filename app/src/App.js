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
      setUserLogged(token)
    }
  }, [])

  function handleSetLogin () {
    setLogin(prevState => !prevState)
  }

  return (
    <div>
      <div className='navbar navbar-dark bg-dark shadow-sm'>
        <button style={{ marginLeft: '15px' }} className='btn btn-primary my-2' onClick={handleSetLogin}>{login ? 'Registrarse' : 'Loguearse'}</button>
        {login
          ? <Login logged={userLogged} setLogged={setUserLogged} />
          : <Register />}
      </div>

      <h1 style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', fontFamily: 'italy', fontSize: '50px' }}>APLICACION DE NOTAS</h1>
      <Notes logged={userLogged} setLogged={setUserLogged} />
    </div>
  )
}

export default App
