import { createAnecdote } from "../reducers/anecdote-Reducer"
import { useDispatch } from "react-redux"
import {  notification } from "../reducers/notifcationReducer"


const AddAnectodes = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value

        dispatch(createAnecdote(anecdote))
        
        event.target.anecdote.value = '' 

        dispatch(notification(`added ${anecdote}`))
       
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
                <input name='anecdote'/>
            </div>
            <button type='submit'>create</button>
      </form>
    </div>
)
}

export default AddAnectodes