import diaryEntry from '../../data/entries';
import { DiaryEntry, newDiaryEntry, NonSensitiveEntry } from '../../types';



const getEntries = (): DiaryEntry[] => {
    return diaryEntry;
};

const addDiary = (entry: newDiaryEntry):DiaryEntry => {
    const newEntry = {
        id: Math.max(...diaryEntry.map(d => d.id)) + 1,
        ...entry
    };
    console.log(newEntry);
    console.log(diaryEntry.concat(newEntry));
    diaryEntry.push(newEntry);
    return newEntry;
};

export const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
    return diaryEntry.map(({id, date, weather, visibility}) => 
        ({
            id, 
            date, 
            weather, 
            visibility  

        })
    );
};

export const findById = (id: number): DiaryEntry | undefined => {
    const diary = diaryEntry.find(diary => diary.id = id);
    return diary;
};

export {getEntries, addDiary};