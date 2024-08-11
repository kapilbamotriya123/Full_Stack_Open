import express from 'express'

const app = express()

app.get('/ping', (_req, res) => {
    res.send('pong')
})
9
const PORT = 3001

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`)  
})