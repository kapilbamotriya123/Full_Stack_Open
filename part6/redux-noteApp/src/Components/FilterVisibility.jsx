
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const FilterVisibility = (props) => {
    const dispacth = useDispatch()
    
    

    return (
        <div>
            all          <input type="radio" name="filter"
            onChange={() => dispacth(filterChange('ALL'))} />
            important    <input type="radio" name="filter"
            onChange={() => dispacth(filterChange('IMPORTANT'))} />
            nonimportant <input type="radio" name="filter"
            onChange={() => dispacth(filterChange('NONIMPORTANT'))} />
        </div>
    )
}

export default FilterVisibility