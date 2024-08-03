import { createSlice } from "@reduxjs/toolkit";

import noteService from "../services/notes";


  
const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name:'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            
            const noteToChange = state.find(note => note.id === action.payload)
            const changedNote = { ...noteToChange, important: !noteToChange.important }
            return state.map(note => note.id === noteToChange.id ? changedNote : note)
        },
        setNotes(state, action) {
          return action.payload
        },
        appendNote(state, action) {
            state.push(action.payload)
        }
    }
})

export const {toggleImportanceOf, setNotes, appendNote} = noteSlice.actions

export const initialiseNotes = () => {
    return async dispatch => {
        const allNotes = await noteService.getAll()
        dispatch(setNotes(allNotes))
    }
}

export const createNote = (content) => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}
export default noteSlice.reducer
