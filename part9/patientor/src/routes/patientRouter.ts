import express from 'express';
import { getPatientsData } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.json(
        getPatientsData()
    );
});

export default router;

