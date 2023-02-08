export const loginReducer = (state = false, action) => {
  if (action.type === '@token/login') {
    window.localStorage.setItem('token', action.payload)
    state = action.payload
  }

  if (action.type === '@token/logout') {
    window.localStorage.removeItem('token')
    state = false
  }

  if (action.type === '@token/getToken') {
    const token = window.localStorage.getItem('token') || false
    state = token
  }
  return state
}
