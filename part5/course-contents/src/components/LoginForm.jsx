const LoginForm = ({handleLogin, username, password, setUsername, setPassword,}) => {
    return (
    <form onSubmit={handleLogin} >
    <div>
      username 
      <input type = 'text' value={username} name = 'Username' onChange={(event)=> setUsername(event.target.value)}/>
    </div> 
    <div>
      password
      <input type = 'password' value ={password} name = 'Pasword' onChange={(event) => setPassword(event.target.value)}/>
    </div>
    <button type = 'submit'>Login</button>
  </form> 
    )
  }

  export default LoginForm;