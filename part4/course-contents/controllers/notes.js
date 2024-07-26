const notesRouter = require('express').Router()
const Note = require('../models/note')


 
notesRouter.get('/', async (request, response) => {
  try{
    const notes = await Note.find({})
    response.json(notes)
    }
  catch(error) {
    next(error)
  }
  })
  


notesRouter.get('/:id', async (request, response, next) => {
  try {const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
    }
    catch (error){
      console.log(`are we getting this error`,error)
      response.status(400).send(`mallformated id`)
      next(error)
    }
   
})
  
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
 catch(error) {
 next(error)
 }
})
  
notesRouter.put('/:id', async (request,response,next) => {
  const {content, important} = request.body
  try {
  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    {content, important},
    {new: true, runValidators: true, context: 'query'}
  )
  response.json(updatedNote)
}
catch(error) {next(error)}
})

//generate a random id first
notesRouter.post('/',async (request,response,next) => {
  const body = request.body//json parser the data json data into java script object and makes it possible to changes the propertyof object here whcih is not possible with the json formated string 

  const note = new Note({
    content:body.content,
    important: Boolean(body.important) || false,
  })

  try {
  const savedNote =await note.save()
  response.status(201).json(savedNote)
  }
  catch(error) {next(error)}
})
module.exports= notesRouter