const config = require(`./utils/config`)
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require(`./controllers/notes`)
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const errorHandler = require(`./utils/middleware`)

mongoose.set('strictQuery',false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result =>{
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.info('error connecting to MongoDB',error.message)
    })


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(`/api/notes`,notesRouter)
app.use(errorHandler)


module.exports = app    