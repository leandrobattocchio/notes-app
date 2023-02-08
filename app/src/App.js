import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from './services/notesService'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import Inicio from './pages/inicio/Inicio'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './App.css'

function App () {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)

  useEffect(() => {
    dispatch({ type: '@token/getToken' })
    getNotes()
      .then((data) => {
        dispatch({ type: '@notes/getNotes', payload: data })
      })
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route
          path='/login' element={
             token
               ? <Navigate to='/' replace />
               : <Login />
            }
        />
        <Route
          path='/register' element={
              token
                ? <Navigate to='/' replace />
                : <Register />
            }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
