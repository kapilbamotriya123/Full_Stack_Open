const config = require(`./utils/config`)
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require(`./controllers/notes`)
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const errorHandler = require(`./utils/middleware`)
require('express-async-errors')

mongoose.set('strictQuery',false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result =>{
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB',error.message)
    })





app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(`/api/notes`,notesRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(errorHandler)


module.exports = app    