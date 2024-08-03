
import AddAnectodes from './components/AddAnectodes'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialiseNotes } from './reducers/anecdote-Reducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  dispatch(initialiseNotes())
  

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdotesList/>
      <AddAnectodes />
    </div>
  )
}

export default App