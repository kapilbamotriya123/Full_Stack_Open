import { Entry, NewPatient, PatientsWoSsn } from "../../types";
import patientsData from '../../data/patients';
import { Patient } from "../../patientor/src/types";
import{v1 as uuid} from 'uuid';
import { parseEntry } from "../utils/toNewPatient";

const id = uuid();

export const getPatientsData = ():PatientsWoSsn[] => {
    return patientsData.map( ({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }) );

};
export const addPatient = (patient: NewPatient):Patient => {
    const newPatient = {
        id,
        ...patient
    };
    
    patientsData.push(newPatient);
    return newPatient;

};

export const addEntry = (entry: unknown, patientId:Patient['id']):Entry => {

    if(typeof entry === 'object') {
        const newEntry:Entry = parseEntry({
            id, 
            ...entry
        });
        patientsData.map(patient => {
            if (patient.id === patientId) {
                patient.entries.push(newEntry);
                return patient;
            }
            return patient;
        });
        return newEntry;
    } else {
        throw new Error('invalid entry');
    }
};
