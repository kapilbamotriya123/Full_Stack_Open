import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [notification, setNotification] = useState('')

  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[url, setUrl] = useState('')




  // console.log('logging with','username: ', username, 'password: ', password);
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect( ()=> {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
    setUser(user)
    blogService.setToken(user.generatedToken)
    }
  },[]) 

  //this is login handler
  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user = await loginService({username, password})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setPassword('')
      setUsername('')
      
    }
    catch(exception) {
      setNotification('incorrect username or password')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }
  
  const addBlog = async (event) => {
    event.preventDefault()  
    
    const newBlog = {title, author, url}
    if (title === "" || author === "" || url === "") {
      setNotification(`all three fields are mandatory`)
      setTimeout(() => {
      setNotification('')
    }, 5000);
      return 
    }
    try {
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setNotification(`Added ${response.title} successfully`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  } catch(exception) {
    setNotification(`all three fields are mandatory`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }
  }
  const userName = () => {
    if (user) {
      return user.username
    }
    return null
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <form onSubmit = {handleLogin}>
          <div>
            username
            <input name = 'username' type ='text' value={username} onChange={(event)=> setUsername(event.target.value)}/>
          </div>

          <div>
            password
            <input name = 'password' type = 'password' value = {password} onChange={({target}) => setPassword(target.value)} />
          </div>
        <button type = 'submit'>log in </button>
        </form>
      <h3>{notification}</h3>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      
      Logged in as: {userName()}
      <button onClick={logOut}>logout</button>
      <h1>{notification}</h1>
      <BlogForm 
        addBlog = {addBlog}
        title = {title} setTitle = {setTitle}
        author = {author} setAuthor = {setAuthor}
        url = {url} setUrl = {setUrl}
        />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App