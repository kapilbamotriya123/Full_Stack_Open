import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
const AddAnectodes = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(createAnecdote(anecdote))
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