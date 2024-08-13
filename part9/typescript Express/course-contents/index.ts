import express from 'express';
import { calculator } from './calculator';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.post('/calculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {value1, value2, op} = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).json({error:'value must be a number'});
  }

  if (!value2  || isNaN(Number(value2))) {
    return res.status(400).json({error:'value must be a number'});
  }
  if(op !==  'multiply' ||op !== 'add' ||op !== 'division' ) {
    return res.json({error:'invalid operators'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.send({result});
});
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);  
});