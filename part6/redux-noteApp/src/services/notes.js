import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {content, important:false}
    console.log(object)
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll , createNew}