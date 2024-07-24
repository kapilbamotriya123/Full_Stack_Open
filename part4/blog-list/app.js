const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require(`./models/blog`)
const blogRouter = require(`./controllers/blogs`)
const dotenv = require("dotenv")
dotenv.config()

//mongodb setup
mongoose.set('strictQuery',false)


const url = process.env.MONGODB_URI

console.log('connecting to url')
mongoose.connect(url)
    .then( result => {
        console.log('connected to url')
    })
    .catch(error => {
        console.log(`error connecting to url`, error.message)
    })  

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)

module.exports = app