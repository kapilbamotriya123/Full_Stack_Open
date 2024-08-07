
import AddAnectodes from './components/AddAnectodes'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialiseNotes } from './reducers/anecdote-Reducer'
import { useDispatch } from 'react-redux'
import  {NotificationContextProvider, useNotificationValue, useNotificationDispatch} from './components/NotificationContext'

import { useContext } from 'react'

const App = () => {
  const dispatch = useDispatch()

  dispatch(initialiseNotes())

  console.log(useNotificationValue)

  return (
    <div>
      <NotificationContextProvider>
        {useNotificationValue && <Notification />}
        <Filter />
        <AnecdotesList/>
        <AddAnectodes />
      </NotificationContextProvider>
    </div>
  )
}

export default App