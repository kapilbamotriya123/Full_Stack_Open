const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require(`./models/blog`)
const blogRouter = require(`./controllers/blogs`)
const config = require(`./utils/config`)
const logger = require('./utils/logger')
const User = require('./models/user')
const userRouter = require('./controllers/users')
const errorHandler = require('./utils/middleware')


//mongodb setup
mongoose.set('strictQuery',false)




logger.info('connecting to url')
mongoose.connect(config.MONGODB_URI)
    .then( result => {
        logger.info('connected to url')
    })
    .catch(error => {
        logger.info(`error connecting to url`, error.message)
    })  
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)

module.exports = app