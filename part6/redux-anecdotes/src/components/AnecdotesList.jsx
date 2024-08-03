import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdote-Reducer"
import { notification } from "../reducers/notifcationReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((an) => an.content.toLowerCase().includes(filter.toLowerCase()));
    }
    return anecdotes;
  });

    const dispatch = useDispatch()

    const vote = (an) => {
        dispatch(addVote(an))
        dispatch(notification(`added ${an.content}`))
      }

    //sorting the anecdotes
    
    const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

    return (  
        <div>
            <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            <strong>has {anecdote.votes}</strong>
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdotesList