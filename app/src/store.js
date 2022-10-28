import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
import { noteReducer } from './reducers/noteReducer'
import { loginReducer } from './reducers/loginReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notes: noteReducer,
  token: loginReducer
})
const store = configureStore(
  { reducer },
  applyMiddleware(thunk)
)
export { store }
