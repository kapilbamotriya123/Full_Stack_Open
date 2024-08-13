
import express from 'express';
import {  addDiary, findById, getEntries } from '../services/diaryServices';
import { toNewDiaryEntry } from '../utils/toNewDiaryEntry';

const router = express.Router();


router.get('/', (_req, res) => {
  
  res.json(
    getEntries()
  );
});


router.get('/:id', (req, res) => {
  const diary =  findById(Number(req.params.id));

  if(diary) {
    return res.send(diary);
  }
  else  {
    return res.status(404);
  }
});

router.post('/', (req, res) => {
   try {
    const  newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch(error: unknown){
    let errorMessage = 'something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send({error: errorMessage});
  }
});

export default router ;