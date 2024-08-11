import { PatientsWoSsn } from "../../types";
import patientsData from '../../data/patients';

export const getPatientsData = ():PatientsWoSsn[] => {
    return patientsData.map( ({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }) );
};

