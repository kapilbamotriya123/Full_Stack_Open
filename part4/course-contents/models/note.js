const mongoose = require('mongoose')
const config = require(`../utils/config`)
const logger = require(`../utils/logger`)




const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    } ,
    important: Boolean,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

/*basically what the following code is doing is the object that is returned from the mongodb
has two additional properties they we have defined one for the id and on __v what we want to
do is convert the _id to normal id as we have used that keyword in out syntax and __v is of no use */

noteSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject. _id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note',noteSchema)