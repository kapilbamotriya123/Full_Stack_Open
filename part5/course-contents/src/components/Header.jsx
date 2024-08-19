import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/notes">notes</Link>
        <Link to="/users">users</Link>
        <Link to="/login">login</Link>
      </div> 
    </div>
  );
};

export default Header;