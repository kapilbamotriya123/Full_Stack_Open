const notesRouter = require('express').Router()
const Note = require('../models/note')


 
notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
    .catch(error => next(error))
  })
  
notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(`are we getting this error`,error)
      response.status(400).send(`mallformated id`)
    })
    .catch(error => next(error))
})
  
notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(result =>{
    response.status(202).end()
  })
  .catch(error => next(error))
})
  
notesRouter.put('/:id', (request,response,next) => {
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
notesRouter.post('/',(request,response,next) => {
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

module.exports= notesRouter