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
  

export interface Patients {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender:Gender,
    occupation:string,
}

export type NewPatient = Omit <Patients, 'id'>;

export type PatientsWoSsn = Omit < Patients, 'ssn'>;
