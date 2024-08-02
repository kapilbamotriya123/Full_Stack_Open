import { useState, useEffect } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
  }
  },[])
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(returnedNotes => {
       
      setNotes(notes.concat(returnedNotes))
      setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteUser')
    setUser(null)
  }

  
  //this is to handle username and password change
  const  handleLogin = async(event) => {
    event.preventDefault()
    try{
    const user = await loginService.login({username, password })

    window.localStorage.setItem('loggedNoteUser', JSON.stringify(user))
    noteService.setToken(user.token)
    setUser(user)
    setPassword('')
    setUsername('')
    } 
    catch(exception) {
      setErrorMessage('wrong credentials')
      setTimeout( () => {
        setErrorMessage(null)
      }, 5000)
    }  
  }
  
    const loginForm = () => {
      //showWhenVisible shows the button when login form is visible
      const showWhenVisible = {display: loginVisible ? 'block' : 'none'}
  
      //hideWhenVisible hides the button when login form is visible 
      const hideWhenVisible = {display: loginVisible ? 'none': 'block'}
      return (
      <div>
        <div style= {hideWhenVisible}>
          <button onClick={() => {setLoginVisible(true)}}>log in</button>
        </div>
        <div style= {showWhenVisible}>
          <LoginForm 
            handleLogin = {handleLogin}
            username = {username}
            password = {password}
            setUsername ={setUsername}
            setPassword = {setPassword}
          />
          <button  onClick={() => {setLoginVisible(false)}}>cancel</button>
        </div>
      </div>
      )
    }

    
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
    {user !== null && <h1>{user.username}</h1> }
    
    {user===null && loginForm()}
     
      <div id='error'><h3>{errorMessage}</h3></div>



      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
        
      {user !== null && 
      <>
      <NoteForm 
        addNote= {addNote} 
        newNote = {newNote} 
        handleNoteChange = {handleNoteChange}
        /> 
        <button onClick={logOut}>Log out</button> 
        </>}
      
      
    </div>
  )
}

export default App