const Person = ({persons,handleDeleteEvent}) => {
    return (
      <div>
        {persons.map(person=>
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick = {() => handleDeleteEvent(person.id)}>delete</button>
          </p>
          
        )}
      </div>
    )
}

export default Person