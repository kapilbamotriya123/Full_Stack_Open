import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types"

let axError: string = ''
const baseUrl = 'http://localhost:3001/api/diaries'

export const getAll = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then(response => {
        return response.data
    })
}

export const createDiary = async (object: NewDiaryEntry) => {
    try {
        const data = await axios.post<DiaryEntry[]>(baseUrl, object).then( response => response.data)
        return data;
    } catch(error: unknown) {
        if(axios.isAxiosError(error)) {
            if(error.response) {
               axError = error.response.data
            }
        } 
    }
}

export {axError}