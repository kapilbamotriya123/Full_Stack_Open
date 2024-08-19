import { useContext, useEffect, useState } from "react"
import noteService from '../../services/notes'
import Note from '../../components/Note'
import NoteForm from "../NoteForm"
import {UserContext } from "../UserContextProvider"




const Notes = () => {
    const [showAll, setShowAll] = useState(true)
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')




    useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes)
          })
      }, [])

      // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useContext(UserContext)
    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    const toggleImportanceOf = id => {
      // const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      noteService
        .update(id, changedNote)
          .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_error => {
          alert(
            `the note '${note.content}' was already deleted from server`
          )
          setNotes(notes.filter(n => n.id !== id))
        })
    }

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

    
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteUser')
    setUser(null)
  }


    return (
        <div>
          <h1>All Notes</h1>
          {/* {user !== null && <h1>{user.username}</h1> } */}

          {user !== null && 
      <>
      <NoteForm 
        addNote= {addNote} 
        newNote = {newNote} 
        handleNoteChange = {handleNoteChange}
        /> 
        <button onClick={logOut}>Log out</button> 
        </>}

          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all' }
            </button>
          </div>
          
          <ul>
            {notesToShow.map(note => 
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            )}
          </ul>
        </div>
    )
}

export default Notes