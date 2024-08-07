import {Link} from 'react-router-dom'
const Menu = () => {
    const padding = {
      paddingRight: 5
    }

    return (
      <div>
        <Link to='/' style={padding}>anecdotes</Link>
        <a href='/create' style={padding}>create new</a>
        <a href='/about' style={padding}>about</a>
      </div>
    )
  }
  
  export default Menu