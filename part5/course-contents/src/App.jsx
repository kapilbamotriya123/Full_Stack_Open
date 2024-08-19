import noteService from './services/notes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Pages/Homepage';
import Header from './components/Header';
import Notes from './components/Pages/Notes';
import Users from './components/Pages/Users';
import Login from './components/Pages/LoginPage';
import { UserContextProvider} from './components/UserContextProvider';
import { useEffect, useState } from 'react';

const App = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  

  return (
    <div>
      <UserContextProvider value ={{user, setUser}}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/users' element={user !== null ? <Users /> : <Navigate replace to="/" />} />
            <Route path='/login' element={user === null ? <Login /> : <Navigate replace to="/" />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
};

export default App;
