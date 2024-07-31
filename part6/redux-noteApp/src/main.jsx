import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'

import {createStore} from 'redux'

const noteReducer = (state = [], action) => {
  if(action.type === 'NEW_NOTE') {
    return state.concat(action.payload) 
  }
  
  if(action.type === 'CHANGE_IMP') {
    const id = action.payload.id
    
    const noteToChange = state.find(n => n.id===id)
    
    const changedNote = {...noteToChange, important: !noteToChange.important}
    
    return state.map(n => 
      n.id!==id ? n : changedNote
    )
  }
  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type:'NEW_NOTE',
  payload: {
    content:'this is again a new note but now through redux',
    id:1,
    important:true
  }
})

store.dispatch({
  type:'NEW_NOTE',
  payload: {
    content:'this is second note to test the redux lib',
    id:2,
    important:false
  }
})

store.dispatch({
  type:'CHANGE_IMP',
  payload: {
    id:2
  }
})

function App() {

  return (
    <>
      <ul>
        {store.getState().map(note => (
          <li key={note.id}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render( <App />)
}

renderApp()

store.subscribe(renderApp)


  
