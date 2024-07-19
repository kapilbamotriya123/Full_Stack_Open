import { useState } from 'react'
const Button = (props) => {
  return (
    <button onClick = {props.eventHandler}>{props.text}</button>
    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a   qlate software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  //console.log(Math.floor(Math.random() * 5))   
  //console.log(anecdotes.length)
  //console.log(Math.floor(Math.random()*anecdotes.length))
  console.log(votes)


  const handleEventVote = () => {
    const newVotes = [...votes]
    if (!newVotes[selected]) {
        newVotes[selected] = 1
    }
    else {
    newVotes[selected] += 1
    }
    setVotes(newVotes)
  }

  const handleEventanecdote = () => {
    
    const random = Math.floor(Math.random()*anecdotes.length)
    if (random === selected) {
      handleEventanecdote()
    }
    else  {
    setSelected(random)
    }
  }

  //finding the index of anecdote with highest votes
  const highestVotes = () => {
    let max_index = 0 // index of anectode with max votes
    for (let i = 0, length = anecdotes.length; i<length; i++)
    {
      if(votes[i] > votes[max_index]) {
        max_index = i
      }
    }
    return max_index
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]} 
      <br></br>
      votes: {votes[selected]}
      <div>
      <Button eventHandler = {handleEventanecdote} text = {'next anecdote'}/>
      <Button eventHandler = {handleEventVote} text ={'vote'} />
      </div>

      <div>
        <h1>Anectode with most count</h1>
      {anecdotes[highestVotes()]} 
      <br></br>
      votes: {votes[highestVotes()]}
      </div>
    </div>
  )
}

export default App

