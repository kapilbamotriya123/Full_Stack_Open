const AddPersonForm = (props) => {
    return (
    <div>
       <h3>Add New</h3> 
       <form onSubmit={props.addPerson}>
          <div>
            name: <input 
            value ={props.newName}
            onChange={props.handleNameChange}
            />
            <br/>
          number: <input 
            value ={props.newNumber}
            onChange={props.handleNumberChange}
            />
  
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    </div>
    )
  }

export default AddPersonForm