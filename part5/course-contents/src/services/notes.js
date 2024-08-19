import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/notes'

let token = null

const getAll = () => {
    const request = axios.get(baseUrl) 
   
    return request
    .then(response=>response.data)
    .catch(error => {
        console.log(error)
        throw error
    })
}


const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const create = async (newObject) => {
    console.log(token);
    const config =  {
        headers: {Authorization: token}
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response=>response.data)
    
}
export default {getAll, create, update, setToken}
