const mongoose= require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as command line arg')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://KapilBamotriya:${password}@phonebook.ecmvcxy.mongodb.net/phonebook?retryWrites=true&w=majority&appName=PhoneBook`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)



const addPerson = () => {
    const person = new Person({
        name: personName,
        number: personNumber
    })
    
    person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}
const showAll = () => {
    Person.find({}).then(result => {
        console.log(`phonebook: `)
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    showAll()
}

else if (process.argv.length === 5) {
    addPerson()
}