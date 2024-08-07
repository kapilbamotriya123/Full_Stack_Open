import { useParams } from "react-router-dom"

const Anecdote = ({anecdotes}) => {
    const params = useParams()
    const id = params.id
    const anecdote = anecdotes.find(an => an.id === Number(id)) 
    return (
        <div>
            <h2>                
                {anecdote.content}
            </h2>
            has {anecdote.votes} votes
            <div>
                <br/>
                for more info see this    
                <a href={anecdote.info}>: {anecdote.info}</a>
            </div>
            
        </div>
    )
}

export default Anecdote