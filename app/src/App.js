import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Notes from './components/Notes'
import { useDispatch } from 'react-redux'
import { getNotes } from './services/notesService'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: '@token/getToken' })
    getNotes()
      .then(notes => {
        dispatch({ type: '@notes/getNotes', payload: notes })
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='container'>
      <Header />
      <Notes />
    </div>
  )
}

export default App
