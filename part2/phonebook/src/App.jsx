import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import Person from './components/Person';
import AddPersonForm from './components/AddPersonForm';
import personService from './services/persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        if (Array.isArray(returnedPersons)) {
          setPersons(returnedPersons);
        } else {
          console.error('Expected an array of persons, but received:', returnedPersons);
        }
      });
  }, []);

  let toShow = persons;
  if (keyword !== '') {
    toShow = persons.filter(person =>
      person.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    let nameExists = false;
    persons.forEach(person => {
      if (person.name === newName) {
        alert(newName + ' already exists');
        nameExists = true;
      }
    });

    let numberExists = false;
    let existingId = 0;

    if (persons.forEach(person => {
      if (person.number === newNumber) {
        existingId = person.id;
        numberExists = true;
      }
    }));

    if (numberExists) {
      if (window.confirm(`Are you sure you want to add an existing number`)) {
        const person = persons.find(person => person.id === existingId);
        const updatedPerson = { ...person, name: newName };

        personService.update(existingId, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingId ? person : returnedPerson
          ));
        });
      }
    }

    if (!nameExists && !numberExists) {
      const personObj = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObj)
        .then(returnedperson => {
          setPersons(persons.concat(returnedperson));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleDeleteEvent = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}`)) {
      personService.del(id).then(returnedperson => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <div className="header">
        <h2>Kapil's Phonebook</h2>
      </div>

      <div className="container">
        <div className="filter-container">
          <Filter handleKeyword={handleKeyword} keyword={keyword} />
        </div>

        <AddPersonForm
          addPerson={addPerson}
          newName={newName}
          handleNumberChange={handleNumberChange}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
        />

        <h2 className="title">Numbers</h2>

        <Person persons={toShow} handleDeleteEvent={handleDeleteEvent} />

        <div className="footer">
          <p>&copy; Kapil Bamotriya 2024</p>
        </div>
      </div>
    </div>
  );
};

export default App;
