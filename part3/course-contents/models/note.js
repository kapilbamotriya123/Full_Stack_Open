const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(result =>{
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB',error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    } ,
    important: Boolean,
})

// /basically what is doing is the object that is returned from the mongodb has two additional properties they we have defined one for the id and on __v 
//what we want to do is convert the _id to normal id as we have used that keyword in out syntax and __v is of no use 

noteSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject. _id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note',noteSchema)