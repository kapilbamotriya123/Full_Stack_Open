import { useContext, useState } from "react"
import LoginForm from "./LoginForm"
import noteService from '../services/notes'
import loginService from '../services/login'
import userContext from "../userContext"



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginVisible, setLoginVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)


    // eslint-disable-next-line no-unused-vars
    const [_user, setUser] = useContext(userContext)

    // this will handle the if there is user info in local storage
 
      

      const  handleLogin = async(event) => {
        event.preventDefault()
        try{
        const user = await loginService.login({username, password })
    
        window.localStorage.setItem('loggedNoteUser', JSON.stringify(user))
        noteService.setToken(user.token)
        setUser(user)
        setPassword('')
        setUsername('')
        } 
        catch(exception) {
          setErrorMessage('wrong credentials')
          setTimeout( () => {
            setErrorMessage(null)
          }, 5000)
        }  
      }
    //showWhenVisible shows the button when login form is visible
    const showWhenVisible = {display: loginVisible ? 'block' : 'none'}

    //hideWhenVisible hides the button when login form is visible 
    const hideWhenVisible = {display: loginVisible ? 'none': 'block'}
    return (
    <div>
      <div style= {hideWhenVisible}>
        <button onClick={() => {setLoginVisible(true)}}>log in</button>
      </div>
      <div style= {showWhenVisible}>
        <LoginForm 
          handleLogin = {handleLogin}
          username = {username}
          password = {password}
          setUsername ={setUsername}
          setPassword = {setPassword}
        />
        <button  onClick={() => {setLoginVisible(false)}}>cancel</button>
      </div>
      <div id='error'><h3>{errorMessage}</h3></div>

    </div>
    )
  }

  export default Login