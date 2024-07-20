

const mongoose= require('mongoose')


mongoose.set('strictQuery',false)


const url = `mongodb+srv://KapilBamotriya:KapilDatabase@phonebook.ecmvcxy.mongodb.net/phonebook?retryWrites=true&w=majority&appName=PhoneBook`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)


