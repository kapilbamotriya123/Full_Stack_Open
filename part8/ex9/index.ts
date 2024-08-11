import  express from 'express'
import bmiCalculator from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res)=> {
    res.send('HELLO FULL STACK');
} )

app.get('/bmi', (req, res) => {
    const height = req.query.height 
    const weight = req.query.weight 
    if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
       res.json({
        height,
        weight,
        bmi: bmiCalculator(Number(height), Number(weight))
       })
    } else {
        res.status(400).json({error: 'malformatted parameters'})
    }
})
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
})
