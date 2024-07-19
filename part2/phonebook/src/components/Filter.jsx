const Filter = (props)   => {
    return(
      <div>
         filter shown with:<input  onChange={props.handleKeyword} value={props.keyword}/>
      </div>
    )
  }
  export default Filter