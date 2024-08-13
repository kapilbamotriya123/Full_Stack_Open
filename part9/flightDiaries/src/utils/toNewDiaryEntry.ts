import { newDiaryEntry, Visibility, Weather } from "../../types";

export  const toNewDiaryEntry = (object: unknown):newDiaryEntry => {
    if(!object || typeof object !== 'object') {
        throw   new Error('incorrect or missing data');
    }
    if ('visibility' in object && 'weather' in object && 'date' in object && 'comment' in object) {

        const newDiaryEntry = {
            comment: parseComment(object.comment),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date)
        };
        return newDiaryEntry;
    }
    throw new Error('incorrect data: somefields are missing');

};

const parseComment = (comment: unknown) :string => {
    if(!comment || ! isString(comment)) {
        throw new Error('comment missing or invalid');
    }
    return comment;
};



const isString = (text: unknown): text is string => {
    return text instanceof String || typeof text === 'string';
};

const isDate = (date: string ): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date:unknown): string => {
    if ( !date || ! isString(date) || !isDate(date)) {
        throw new Error('date is missing or invalid' + date);
    }
    return date;
};


const isVisibility = (param:string): param is Visibility => {
    return Boolean(Object.values(Visibility).map(v => v.toString()).includes(param));
};

const parseVisibility = (param:unknown): Visibility => {
    if( !param || !isString(param) || !isVisibility(param)) {
        throw new Error('missing visibility of invalid' + param);
    }
    return param;
};


const isWeather = (weather: string): weather is Weather => {
    return Boolean(Object.values(Weather).map(v => v.toString()).includes(weather));
};

const parseWeather = (weather: unknown) : Weather => {
    if( !weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('missing weather or invalid' + weather);
    }
    return weather;
};
