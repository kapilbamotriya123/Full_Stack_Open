import axios from "axios";

const baseUrl = "http://localhost:3001/person"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response =>
        response.data
    )
}

const create = (newPerson) => {
    const request = axios.post(baseUrl,newPerson)
    return request.then(response =>
        response.data
    )
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`,id)
        return request.then(response => response.data)
}

const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject )
    return request.then(response => response.data)
}



export default {getAll, create, del, update}