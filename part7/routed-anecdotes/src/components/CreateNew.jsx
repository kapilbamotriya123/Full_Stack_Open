import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"


const CreateNew = (props) => {
    const navigate = useNavigate()
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const {reset: contentReset, ...contentInput} = content
    const {reset: authorReset, ...authorInput} = author
    const {reset: infoReset, ...infoInput} = info

  

    
  const addNew = (anecdote) => {
   
    anecdote.id = Math.round(Math.random() * 10000)
   

    props.setAnecdotes(props.anecdotes
        .concat(anecdote))
    setTimeout( () => {
        props.setNotification('')
        }, 5000)
        props.setNotification(`added "${anecdote.content}"`)
  }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')      
    }
    const reset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...contentInput} />
          </div>
          <div>
            author
            <input {...authorInput} />
          </div>
          <div>
            url for more info
            <input {...infoInput} />
          </div>
          <button type = 'submit'>create</button>
          <button onClick={reset}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew