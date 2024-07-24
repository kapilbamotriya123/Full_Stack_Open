const express= require("express")
const morgan = require("morgan")
const cors = require('cors')
const Person = require('./models/phonebook')
const { default: mongoose } = require("mongoose")

const app = express()

//this are all middle ware
app.use(express.json()) //this is jason parsor used for converting json string to javascript object
app.use(cors()) //this is for cross origin request 
app.use(express.static('dist')) //this make the express to read the static content of the dist file 

morgan.token(`body`,(request) => JSON.stringify(request.body))
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(customFormat))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

/*
const generateId = () => {
    const maxId = persons.length > 0
        ?Math.max(...persons.map(person=>Number(person.id)))
        :0
    
    
    return (maxId + 1)
}
*/


app.get('/api/persons',(request,response) => {
    Person.find({}).then(result =>{
        response.json(result)
    })
    
})

app.get('/api/persons/:id',(request,response, next)=> {
    Person.findById(request.params.id)
        .then(note => {
            response.json(note)
        })
        .catch(error => next(error))
})


app.get('/info',(request,response) =>{
    response.send(
        `<p>The phonebook has ${Persons.length} people</p>
        <br/>
        ${Date()}
    `)
})

app.delete('/api/persons/:id',(request, response, next)=> {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(202).end()
        })
        .catch(error => next(error))    
})

app.put('/api/persons/:id', (request, response, next) =>{
    const body = request.body
    
    const person = {
        name:body.name,
        number:body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person , {new: true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.post('/api/persons',(request,response) => {
    const body = request.body
    //this is to check if there is no name in the sent request 
    if(!body.name) {
        response.status(404).json({
            error:'name missing'
        })
    }
    const name = body.name
    //this was to check if there was already a person there with same name
    persons.forEach(person => {
        if(person.name === name) {
            response.status(404).end({
                error:"Name already exist"
            })
        }         
    });

    //this was there there was no number in the sent request

    if(!body.number) {
        response.status(404).json({
            error:'number missing'
        })
    }

    const person =  new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(result=>{
        response.json(person)
    })

})
const PORT = 3001
app.listen(PORT,()=> {
    console.log(`app running on ${PORT}`)
})
