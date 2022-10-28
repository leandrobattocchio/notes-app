import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Notes from './components/Notes'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from './services/notesService'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

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
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Notes />} />
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

    </div>
  )
}

export default App
