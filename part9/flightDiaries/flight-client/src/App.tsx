import { SyntheticEvent, useEffect, useState } from "react"
import { DiaryEntry, Visibility, Weather } from "./types"
import { createDiary, getAll } from "./services/flight"
import FlightDiary from "./component/FlightDiary"

const App = () => {

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry []>([])

  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [date, setDate] = useState('')
  const [comment, setComment] = useState('')

  // const [notification, setNotification] = useState('')

  useEffect( () => {
    getAll().then(data => {
      setDiaryEntries(data)
    })
  }, [])


  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault()
    const newDiary = {
      visibility: visibility as Visibility,
      weather: weather as Weather,
      date: date as string,
      comment: comment as string
    }
    const data = await createDiary(newDiary)
    if(typeof data === 'object') {
      setDiaryEntries(diaryEntries.concat(data))
    } 
    
  }

  return (
    <div>
      <h1>Flight diaries</h1>

      <form onSubmit={handleSubmit}>

        Visibility:
         <div>
          <input name="visibility" type ='radio'  value="great" checked={visibility === 'great'} onChange={() =>setVisibility('great')}/>
          <label >great</label>
          <input name="visibility" type ='radio' value="good" checked={visibility === 'good'} onChange={() =>setVisibility('good')}/>
          <label >good</label>
          <input name="visibility" type ='radio' value="ok" checked={visibility === 'ok'} onChange={() =>setVisibility('ok')}/>
          <label >ok</label>
          <input name="visibility" type ='radio' value="poor" checked={visibility === 'poor'} onChange={() =>setVisibility('poor')}/>
          <label >poor</label>
        </div>
        <br/>

        Weather: 

        <div>
          <input name="weather" type ='radio'  value="sunny" checked = {weather === 'sunny'} onChange={()=> setWeather('sunny')}/>
          <label >sunny</label>
          <input name="weather" type ='radio' value="windy" checked = {weather === 'windy'} onChange={()=> setWeather('windy')}/>
          <label >windy</label>
          <input name="weather" type ='radio' value="cloudy" checked = {weather === 'cloudy'} onChange={()=> setWeather('cloudy')}/>
          <label >cloudy</label>
          <input name="weather" type ='radio' value="rainy" checked = {weather === 'rainy'} onChange={()=> setWeather('rainy')}/>
          <label >rainy</label>
          <input name="weather" type ='radio' value="stormy" checked = {weather === 'stormy'} onChange={()=> setWeather('stormy')}/>
          <label >stormy</label>
        </div>
        <br/>
        Date: <input name = 'Date' type="date" value={date} onChange={(e) => setDate(e.target.value)}/> <br/>
        Comments: <input name = 'Comments' value={comment} onChange={(e) => setComment(e.target.value)}/> <br/>
        <button type="submit">Add Diary</button>
      </form>
      
      <FlightDiary diaryEntries = {diaryEntries}/>
    </div>
  )
}

export default App 