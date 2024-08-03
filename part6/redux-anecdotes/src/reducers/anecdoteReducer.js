/* 
import { combineReducers } from "redux"
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}



const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  if (action.type == 'VOTE') {
    const id = action.payload.id
    const anecdote = state.find(an => an.id === id)    
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    
    return state.map(an => (
      an.id === id
      ? newAnecdote
      : an
    ))
  } else if ( action.type === 'NEW_ANECDOTE') {
    const newAnecdote = action.payload
    
    return state.concat(newAnecdote)
  }
  
  return state
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload;
      default:
        return state;
      }
    };
    
    const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})
//this are action action creator functions
export const addVote = (id) => {
  return {
    type: "VOTE",
    payload:{
      id: id
    }
  }
}

export const createAnecdote = (newAnecdote) => {
  
  const anecdote = asObject(newAnecdote)
  
  return {
    type: "NEW_ANECDOTE",
    payload: anecdote
  }
}

export const addFilter = (filter) => {
  return {
    type: 'FILTER',
    payload: filter
  }
}

export default reducer
*/