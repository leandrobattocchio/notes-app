const NUMBER_OF_IMAGES = 6

export const noteReducer = (state = [], action) => {
  if (action.type === '@notes/getNotes') {
    const data = action.payload.map((note) => {
      return { ...note, numberImg: Math.floor(Math.random() * NUMBER_OF_IMAGES) }
    })
    state = data
  }

  if (action.type === '@notes/postNote') {
    state = state.concat({ ...action.payload, numberImg: Math.floor(Math.random() * NUMBER_OF_IMAGES) })
  }

  if (action.type === '@notes/putNote') {
    const data = state.map((note) => {
      if (note.id === action.payload.id) {
        return { ...action.payload, numberImg: Math.floor(Math.random() * NUMBER_OF_IMAGES) }
      } else {
        return note
      }
    })
    state = data
  }

  return state
}
