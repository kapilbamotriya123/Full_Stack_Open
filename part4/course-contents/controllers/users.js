const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/',async (request,response) => {
    try {
    const {username, name, password} = request.body

    if(password.length < 8) {
        return response.status(400).json({error:"the password must be at least 8 character long"})
    } 
    if(!/^(?=.*\d).*$/.test(password)) {
        return response.status(400).json({error:'password must contain at least one numeric char'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const saveduser = await user.save()
    response.status(201).json(saveduser)
    }
    catch(error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return response.status(400).json({ error:'expected `username` to be unique'})
          }
    }
})

userRouter.get('/',async (request, response) => {
    const users = await User.find({}).populate('notes',{content:1,important:1})
    response.json(users)
})

module.exports = userRouter