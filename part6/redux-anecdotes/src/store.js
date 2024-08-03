import {configureStore} from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdote-Reducer'
import filterReducer from './reducers/filterReducer'
import notifcationReducer from './reducers/notifcationReducer'



const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notifcationReducer
  }
  })



  



export default store
