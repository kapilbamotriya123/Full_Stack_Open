const app = require('../app')
const {test,after,beforeEach, describe} = require('node:test')
const mongoose =  require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const Note = require('../models/note')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { log } = require('node:console')



/* it clear the database then add this initial notes everytime 
the test is run so that we can test things on same database */
/*
beforeEach(async () => {
    
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
    })
    */
const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})

    for(let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    }
})

describe('when there are initially notes saved', () => {
    // test for content type check
    
    test('notes are returned as json',async () => {
        await api.
            get('/api/notes')
            .expect(200)
            .expect('Content-type', /application\/json/)
    })

    //test for get method
    test('checks all notes are fetched', async () => {
        const response = await api.get('/api/notes')
    
        assert.strictEqual(response.body.length, helper.initialNotes.length)
    })
    
    //test for get method, these were for learning test
    test('the first note is about HTTP methods', async () => {
      const response = await api.get('/api/notes')
    
      const contents = response.body.map(e => e.content)
      assert(contents.includes('HTML is easy'))
    })
})

describe('adding notes',()=>{

    //test for adding a valid note
    test('a valid note can be added',async()=>{
        const newNote = {
            content:'this note is to be added for testing',
            important: false
        }
    
        await api.post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-type',/application\/json/)
    
            const notesAtEnd = await helper.notesInDb()
    
        const contents = notesAtEnd.map(r => r.content)
        
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
    
        assert(contents.includes('this note is to be added for testing'))
    
    })
    
    test('note without content is not added', async () => {
        const newNote = {
          important: true
        }
      
        await api
          .post('/api/notes')
          .send(newNote)
          .expect(400)
      
        const response = await api.get('/api/notes')
      
        assert.strictEqual(response.body.length, helper.initialNotes.length)
      })
    
    })
    

describe('viewing and deleting notes',() => {

    test('a specific note can be viewed',async () => {
        const allNotes = await helper.notesInDb()
        const noteToView = allNotes[0]
    
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-type', /application\/json/)
    
        assert.deepStrictEqual(resultNote.body, noteToView)
    })
    
    test('a note can be deleted' ,async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]
    
        await api.delete(`/api/notes/${noteToDelete.id}`)
            .expect(204) 
            
        const noteAtEnd = await helper.notesInDb()
        assert.strictEqual(noteAtEnd.includes(noteToDelete),false)    
    })
})

describe("this are all the tests for users", async = () => {
    
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
      
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
        }
    
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})

after(async () => {
    await mongoose.connection.close();
});