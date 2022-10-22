export const noteReducer = (state = [], action) => {
  if (action.type === '@notes/getNotes') {
    state = action.payload
  }

  if (action.type === '@notes/postNote') {
    state = state.concat(action.payload)
  }
  return state
}
