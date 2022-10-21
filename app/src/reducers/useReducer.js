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
    state = {
      ...state,
      notes: action.payload
    }
  }

  if (action.type === 'postNote') {
    const notes = state.notes
    state = {
      ...state,
      notes: notes.concat(action.payload)
    }
  }
  return state
}
