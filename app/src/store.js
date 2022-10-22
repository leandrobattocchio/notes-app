import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { noteReducer } from './reducers/noteReducer'
import { loginReducer } from './reducers/loginReducer'

const reducer = combineReducers({
  notes: noteReducer,
  token: loginReducer
})
const store = configureStore({ reducer })

export { store }
