import express from 'express';
import { addEntry, addPatient, getPatientsData } from '../services/patientService';
import { toNewPatient } from '../utils/toNewPatient';
import patientsData from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.json(
        getPatientsData()
    );
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    console.log(addedPatient);
    return res.json(addedPatient);
    
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientsData.find(patient => patient.id === id);
    if(patient) {
        res.json(patient);
    } else {
        res.status(400).send('invalid params');
    }
});

router.post('/entry/:id', (req, res) => {
    const entry = addEntry(req.body, req.params.id);
    if(entry) {
        res.json(entry);
    } else {
        res.status(400).send('invalid entry data');
    }
});

export default router;

