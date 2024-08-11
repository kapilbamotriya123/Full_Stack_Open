/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {  addDiary, findById, getNonSensitiveEntries } from '../services/diaryServices';

const router = express.Router();


router.get('/', (_req, res) => {
  
  res.json(
    getNonSensitiveEntries()
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
  const { date, weather, visibility, comment } = req.body;

  const addedEntry = addDiary({
    date,
    weather,
    visibility,
    comment,

  });
  res.json(addedEntry);
});

export default router ;