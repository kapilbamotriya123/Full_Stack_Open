import express from 'express';
import { getPatientsData } from '../services/patientService';
import { toNewPatient } from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.json(
        getPatientsData()
    );
});



router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    
});


export default router;

