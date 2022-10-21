import axios from 'axios'

export const useReducer = (state = { notes: [], token: false }, action) => {
  if (action.type === 'login') {
    const token = window.localStorage.setItem('token', action.payload)
    state = {
      ...state,
      token
    }
    return state
  }

  if (action.type === 'logout') {
    window.localStorage.removeItem('token')
    state = {
      ...state,
      token: false
    }
    return state
  }

  if (action.type === 'getToken') {
    const token = window.localStorage.getItem('token')

    if (!token) {
      state = {
        ...state,
        token: false
      }
    } else {
      state = {
        ...state,
        token
      }
    }
    return state
  }

  if (action.type === 'getNotes') {
    axios
      .get('/api/notes/')
      .then((response) => {
        const { data } = response
        console.log(data)
        state = {
          ...state,
          notes: data
        }
      })
      .catch(error => console.log(error))
    return state
  }
  return state
}
