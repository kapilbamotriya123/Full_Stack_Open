import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnoseRouter';
import patientsRouter from './src/routes/patientRouter';

const app = express();

app.use(express.json());
 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.get('/test', (_req, res) => {
    res.send('Hello Full stack Open');
});

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});