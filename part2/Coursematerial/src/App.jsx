import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from "./services/notes"



const App = () => {

  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true) //this adds a state which refresh the page if showAll is true or not

  

  useEffect(() => {
    //console.log('effect')
    noteService
      .getAll().then(returnedNote => {
      //console.log('promise fullfilled')
      setNotes(returnedNote)
    })
  },[])
  //console.log("render", notes.length, 'notes')
  
  const notesToShow = showAll ? notes:notes.filter(note => note.important===true)//shows notes if Show all is true else shows notes.filter(...)
 
  const addNote=(event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    noteService.create(noteObject)
    .then(returnedNote => {
      //console.log('promise fullfilled')
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }
  

  const toggleImportanceOf = id =>{
  console.log(`the importace of ${id} needs to be toggled`); 

  const URL = `http://localhost:3001/notes/${id}`
  const note = notes.find(n=>n.id===id)
  const changedNote = {...note,important: !note.important}

  noteService.update(id,changedNote).then(returnedNote=>{
      setNotes(notes.map(note=>note.id!==id?note:returnedNote))
    })
    .catch(error =>{
      alert(`the note ${note.content} was already deleted from the server`)
      setNotes(notes.filter(note => note.id!==id))
    })
  }


  

  const handleNoteChange=(event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }


  return (
    <div>
      <h1>Notes</h1>
      
      <ul>
        {notesToShow.map(note=>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>

      <form onSubmit = {addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type='submit'>Save</button>

        
      </form>
        <button onClick={()=>setShowAll(!showAll)}>
        show {showAll?'important':'all'}
        </button>

      
    </div>
  )
}

export default App
