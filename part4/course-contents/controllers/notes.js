const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


notesRouter.get('/', async (request, response) => {
  try{
    const notes = await Note.find({}).populate('user',{username:1,name:1})
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


//function to get token from the request header
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ','')){
    return authorization.replace('Bearer ','')
  }
  return null    
}

notesRouter.post('/',async (request,response,next) => {
  const body = request.body//json parser the data json data into java script object and makes it possible to changes the propertyof object here whcih is not possible with the json formated string 
  if (!body.content) {
    return response.status(400).json({error:'content missing'})
  }
  let decodedToken = null
   try {
    decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
     }
  catch(error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  }
   

  if(!decodedToken.id){
    return response.status(401).json({error: "token invalid"})
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content:body.content,
    important: Boolean(body.important) || false,
    user:user.id
  })

  try {
  const savedNote =await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
  }
  catch(error) {next(error)}
})
module.exports= notesRouter