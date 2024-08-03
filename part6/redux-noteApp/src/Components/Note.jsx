import { useDispatch } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"


const Note = ({note}) => {
    const dispatch = useDispatch()

    const toggleImportance = (id) => {
        dispatch(toggleImportanceOf(id))
      }
    // console.log(note)
    return (
        <li
        key={note.id}
        onClick={() => toggleImportance(note.id)}
        >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
    )
}

export default Note