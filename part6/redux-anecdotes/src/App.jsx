
import AddAnectodes from './components/AddAnectodes'
import AnecdotesList from './components/AnecdotesList'
import Filter from './Filter'


const App = () => {

  return (
    <div>
      <Filter />
      <AnecdotesList/>
      <AddAnectodes />
    </div>
  )
}

export default App