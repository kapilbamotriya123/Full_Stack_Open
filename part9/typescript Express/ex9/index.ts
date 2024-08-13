import  express from 'express';
import bmiCalculator from './bmiCalculator';
import { exCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json())

app.get('/hello', (_req, res)=> {
    res.send('HELLO FULL STACK');
} );

app.get('/bmi', (req, res) => {
    const height = req.query.height; 
    const weight = req.query.weight; 
    if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
       res.json({
        height,
        weight,
        bmi: bmiCalculator(Number(height), Number(weight))
       });
    } else {
        res.status(400).json({error: 'malformatted parameters'});
    }
});

app.post('/exercises', (req, res) => {
    const {daily_exercises, target} = req.body;
    
    if (!daily_exercises || daily_exercises.find((item: unknown) =>  isNaN(Number(item)))|| !target && isNaN(Number(target))) {
        return res.status(400).json({error: "invalid params"})
    }
    return res.json(exCalculator(daily_exercises, target))

})
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
}); 
