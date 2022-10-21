import './App.css'
import Header from './components/Header'
import Notes from './components/Notes'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useReducer } from './reducers/useReducer'

function App () {
  const store = configureStore({ reducer: useReducer })

  return (
    <div className='container'>
      <Provider store={store}>
        <Header />
        <Notes />
      </Provider>
    </div>
  )
}

export default App
