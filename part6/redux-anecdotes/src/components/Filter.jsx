import { useDispatch } from "react-redux"
import {addFilter } from "../reducers/filterReducer"
const Filter = () => {
    const dispatch = useDispatch(); // Move this outside the handleChange function
  
    const handleChange = (event) => {
      dispatch(addFilter(event.target.value.trim()));
    };
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter