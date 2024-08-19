const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


const notes = [
  {
    content: 'hey this is a note for handling the request which are not connected to mongodb',
    important: true,
    id:53425
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World, How are you!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      response.status(400).send('mallformated id')
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(result =>{
    response.status(202).end()
  })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request,response,next) => {
  const {content, important} = request.body
  
  Note.findByIdAndUpdate(
    request.params.id,
    {content, important},
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

//generate a random id first
const generateId = () => {
  const maxId = notes.length > 0
    ?Math.max(...notes.map(note=>Number(note.id)))
    :0
  return(maxId + 1)
}

app.post('/api/notes',(request,response) => {
  const body = request.body//json parser the data json data into java script object and makes it possible to changes the propertyof object here whcih is not possible with the json formated string 
  
  const note = new Note({
    content:body.content,
    important: Boolean(body.important) || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})
//this is update just for commiting to github
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})