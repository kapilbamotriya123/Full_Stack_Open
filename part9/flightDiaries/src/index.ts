import express from 'express';
import diaryRouter from './routes/diaryRouter';
import cors from 'cors';
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

if (corsOptions) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cors(corsOptions));
}

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});