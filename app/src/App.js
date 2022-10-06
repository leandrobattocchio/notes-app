import './App.css'
import Login from './components/Login'
import Notes from './components/Notes'
import { useEffect, useState } from 'react'

function App () {
  const [userLogged, setUserLogged] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setUserLogged(token)
    }
  }, [])

  return (
    <div>
      <h1>APLICACION DE NOTAS</h1>
      <Login logged={userLogged} setLogged={setUserLogged} />
      <Notes logged={userLogged} setLogged={setUserLogged} />
    </div>
  )
}

export default App
