import express from 'express';
import { getDiagnoseEntries } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    return res.json(
        getDiagnoseEntries()
    );
});

export default router;

