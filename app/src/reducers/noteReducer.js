import { getNotes } from '../services/notesService'

export const noteReducer = (state = [], action) => {
  if (action.type === '@notes/getNotes') {
    state = action.payload
  }

  if (action.type === '@notes/postNote') {
    state = state.concat(action.payload)
  }
  return state
}

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await getNotes()

    dispatch({
      type: '@notes/init',
      payload: notes

    })
  }
}
