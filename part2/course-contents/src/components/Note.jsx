const Note = ({note, toggleImportance})=> {
  const label = note.important
    ?"Not important":"important"
  return (
    <div>
    <li className="notes">{note.content}</li>
    <button onClick={toggleImportance}>{label}</button>
    </div>
  )
}

export default Note