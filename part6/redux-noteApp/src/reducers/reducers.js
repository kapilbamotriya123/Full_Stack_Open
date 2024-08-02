import { combineReducers } from "redux"

const initialNotes = [
  {
    content: 'this is note-1 of two notes demo',
    important: true,
    id:1
  },
  {
    content: 'this is note-2 of two note ssdemo ',
    importnat: false,
    id: 2
  }
]


const noteReducer = (state = initialNotes, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return state.concat(action.payload)
      
    case 'TOGGLE_IMPORTANCE':
      const noteToChange = state.find(note => note.id === action.payload.id)
      const changedNote = { ...noteToChange, important: !noteToChange.important }
      return state.map(note => note.id === noteToChange.id ? changedNote : note)
      default:
        return state
  }
}
      
      
const filterReducer = (state = 'All', action) => {
  switch (action.type) {
    case 'SET_FILTER': 
    console.log(action.payload)
      return action.payload
    default : return state
  }
}
      
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => ({
  type: 'ADD_NOTE',
  payload: { content, important: false, id: generateId() }
})

export const filterChange = (filter) => {
  console.log(filter)
  return {
    type: 'SET_FILTER',
    payload: filter
  }
} 

export const toggleImportanceOf = (id) => ({
type: 'TOGGLE_IMPORTANCE',
payload: { id }
})


export default reducer
