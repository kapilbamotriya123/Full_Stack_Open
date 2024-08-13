import express from 'express';
import { addPatient, getPatientsData } from '../services/patientService';
import { toNewPatient } from '../utils/toNewPatient';

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

export default router;

