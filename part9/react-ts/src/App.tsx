
import { SyntheticEvent, useEffect, useState } from "react"
import {Note} from '../types'
import { getAllNotes, createNote} from "./services/notes";

const App = ( ) => {
    
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  useEffect( () => {
    getAllNotes().then(d => {
      setNotes(d)
    })
  }, [])

  const handleSubmit = (e:SyntheticEvent) => {
    e.preventDefault()
    createNote({ content: newNote }).then(data => {
      setNotes(notes.concat(data))
    })
    const newNoteWId:Note = {
      content: newNote,
      id: Math.max(...notes.map(n => Number(n.id))) + 1,
    }
    
    setNotes(notes.concat(newNoteWId))
    setNewNote('')
  }


  return (
    <div>
      <h1>
        Notes
      </h1>
      <form onSubmit={handleSubmit}>
        <input name="note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit" >submit</button>
      </form>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content} 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App