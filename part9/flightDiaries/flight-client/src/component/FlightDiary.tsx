import { DiaryEntry } from "../types"


const FlightDiary = ({diaryEntries}:{diaryEntries: DiaryEntry[]}) => {
    return (
        <div>
            <h2>Diary Entry</h2>
            {diaryEntries.map(entry => (
                <div key={entry.id}>
                    <h3>{entry.date}</h3>
                    visibility: {entry.visibility}
                    <br/>
                    weather: {entry.weather}
                    <br/>
                    comment: {entry.comment}
                </ div>
            ))}
        </div>
    )
}

export default FlightDiary