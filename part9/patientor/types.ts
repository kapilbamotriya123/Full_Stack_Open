
export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string    
}


export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }
  

//here we will define all thge types related to entry 

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodea?: Array<DiagnoseEntry['code']>;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface  HospitalEntry extends BaseEntry {
    discharge: Discharge;
    type: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    sickLeave:SickLeave;
    type: 'OccupationalHealthcare';
}


export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
    }


export interface HealthCheckEntry  extends BaseEntry {
    healthCheckRating: HealthCheckRating;
    type: 'HealthCheck'
}


export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry 
    | HealthCheckEntry ;


export interface Patients {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender:Gender,
    occupation:string,
    entries: Entry []
}

export type NewPatient = Omit <Patients, 'id' >;

//here it is written that patients without ssn but actually this is replacement for nonsensitive data we previosly named it so I will keep it as this only now
export type PatientsWoSsn = Omit < Patients, 'ssn'| 'entries'>;
