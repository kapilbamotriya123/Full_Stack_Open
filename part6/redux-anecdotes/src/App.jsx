
import AddAnectodes from './components/AddAnectodes'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {

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