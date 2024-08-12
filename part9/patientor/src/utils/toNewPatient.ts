import { NewPatient } from "../../types";

export const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object !== 'object') {
        throw new Error('invalid object or missing: ' + object);
    }
    if( 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
    }
    else {
        throw new Error('missing field in object');
    }
};

const isString = (text:unknown):text is string => {
    return Boolean(typeof text === 'string' || text instanceof String);
};

const parseName = (param:unknown):string => {
    if(!param || !isString(param)) {
        throw new Error('missing name or invalid' + param);
    }
    return param;
};

console.log(parseName);

const isDate = (date:string): boolean => {
    return Boolean(Date.parse(date));
};


const parseDateOfBirth = (param:unknown):string => {
    if(!param || !isString(param) || !isDate(param)) {
        throw new Error('missing date or invalid: ' + param);
    }
    return param;
};

const parseSsn = (param:unknown):string => {
    if(!param || !isString(param) ) {
        throw new Error('missing ssn or invalid: ' + param);
    }
    return param;
};

const parseGender = (param:unknown):string => {
    if(!param || !isString(param) ) {
        throw new Error('missing gender or invalid: ' + param);
    }
    return param;
};

const parseOccupation = (param:unknown):string => {
    if(!param || !isString(param) ) {
        throw new Error('missing occupation or invalid: ' + param);
    }
    return param;
};




