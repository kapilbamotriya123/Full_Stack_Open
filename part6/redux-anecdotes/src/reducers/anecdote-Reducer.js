import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../service/anecdotes'



  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
const anecdoteSlice = createSlice({
    name:'anecdote',
    initialState: [],
    reducers: {
        setAnecdote(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
          state.push(action.payload)
        },
        replaceAnecdote(state, action) {
          return state.map(
            note => note.id === action.payload.id ? action.payload : note
          
          )
        }
    }
})
export const  {replaceAnecdote, setAnecdote, appendAnecdote} = anecdoteSlice.actions

export const initialiseNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAn = {...anecdote, votes: anecdote.votes + 1}
    const updatedAn = await anecdoteService.update(newAn)
    dispatch(replaceAnecdote(updatedAn))
  }
}



export default anecdoteSlice.reducer