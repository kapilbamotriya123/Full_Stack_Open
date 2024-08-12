import { NewPatient, PatientsWoSsn } from "../../types";
import patientsData from '../../data/patients';
import { Patient } from "../../patientor/src/types";
import{v1 as uuid} from 'uuid';

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
    },

};

