
import NewNote from './Components/NewNote'
import Notes from './Components/Notes'
import FilterVisibility from './Components/FilterVisibility'
import { initialiseNotes, setNotes } from './reducers/noteReducer'
import noteService from './services/notes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'



const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initialiseNotes())
  }
  , [])

  
  
  return (
    <div>
      <NewNote/>
      <FilterVisibility />
      <Notes/>
    </div>
  )
}

export default App