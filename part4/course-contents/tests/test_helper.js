const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
    {
        content: "HTML is easy",
        important: true
    },
    {
        content: "But react is tough",
        important:false
    }
]

const nonExistingId = async() => {
    const newNote = new Note({
        content:'this note will be soon removed'
    })
    await newNote.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDb = async() => {
    const notes = await Note.find({})

    return (notes.map(notes => notes.toJSON()))
}
const usersInDb = async () => {
    const users = await User.find({})
    return (users.map(users => users.toJSON()))
}

module.exports = {initialNotes, nonExistingId, notesInDb, usersInDb}