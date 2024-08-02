import {useSelector } from "react-redux"

import Note from "./Note"


const Notes = () => {
    const notes = useSelector( ({notes, filter}) => {
        if (filter === 'ALL' ) {
            return notes
        }
        return filter === 'IMPORTANT' 
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })
    
    


    return (
        <div>
            <ul>
                {notes.map(note =>
                    <Note note = {note} key={note.id} />
                )}
            </ul>

        </div>
    )
}
export default Notes