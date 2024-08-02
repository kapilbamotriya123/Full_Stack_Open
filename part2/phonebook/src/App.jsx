import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Person from './components/Person'
import AddPersonForm from './components/AddPersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')
  
  useEffect(() => {
    //console.log("effect")
    personService.getAll()
      .then(returnedperson => {
        // console.log("promise fulfilled");
        setPersons(returnedperson )
      }
      )
  },[])
  

  // console.log("render", persons.length,"persons");

  //console.log('keyword: ', keyword)

  let toShow = persons;
  if (keyword !== '') {
    toShow = persons.filter(person => 
      person.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  //console.log("toShow: ",toShow)
  
    const handleKeyword =(event)=>{
      setKeyword(event.target.value)
    }
  

  const addPerson =(event)=> {
    event.preventDefault()
    
    //this is for checking if the the person is already present there
    let nameExists = false
    persons.forEach(person => {
    if(person.name === newName){
        alert(newName + ' already exists')
        nameExists = true
      }
    })

    let numberExists = false
    let existingId = 0

    
    if (persons.forEach(person => {
        if(person.number===newNumber) {
        existingId = person.id
        numberExists = true
        }
    }))
    
  console.log(numberExists)
    if(numberExists) {
      if(window.confirm(`are you sure want to add and existing number`)) {
        const person = persons.find(person => person.id===existingId)
        const updatedPerson = {...person,name: newName}

        console.log(updatedPerson)
        
        personService.update(existingId,updatedPerson).then(returnedPerson =>{
          console.log('this is returned person',returnedPerson)
          setPersons(persons.map(person => {
            person.id!==existingId?person:returnedPerson  
          }))
        })
      }
    }
    
    if(!nameExists && !numberExists)
    {
    const personObj = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObj)
      .then(returnedperson => {
        setPersons(persons.concat(returnedperson))
        setNewName('')
        setNewNumber('')
      })
    }  
  }


  const handleDeleteEvent = (id) => {
    if(window.confirm(`Delete ${persons.find(person=>person.id===id).name}`))
    personService.del(id).then(returnedperson =>{
      setPersons(persons.filter(person=>person.id!==id))
    })
  }


  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value)
    //console.log(newName);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleKeyword = {handleKeyword} keyword = {keyword}/>

      <AddPersonForm 
      addPerson = {addPerson}
      newName = {newName}
      handleNumberChange = {handleNumberChange}
      handleNameChange = {handleNameChange}
      newNumber = {newNumber}/>

      <h2>Numbers</h2>
      
      <Person persons ={toShow} handleDeleteEvent={handleDeleteEvent}/>
    </div>
  )
}

export default App