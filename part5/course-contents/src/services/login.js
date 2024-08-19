import axios from 'axios'

//the base url here is the complete url but when they are in the same file we dont need to specify the url 
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
    const response  = await axios.post(baseUrl, credentials)
    
    return response.data
}

export default {login}
