const app = require('../app')
const {test,after,beforeEach} = require('node:test')
const mongoose =  require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const Note = require('../models/note')

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

/* it clear the database then add this initial notes everytime 
the test is run so that we can test things on same database */

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

const api = supertest(app)

test('notes are returned as json',async () => {
    await api.
        get('/api/notes')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, initialNotes.length)
})

test.only('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

after(async() => {
    await mongoose.connection.close()
})