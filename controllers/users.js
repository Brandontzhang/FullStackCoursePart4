const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
    const body = request.body

    console.log(body.password)

    const saltRounds = 10 // cost of hashing (higher -> longer to decode)
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await newUser.save()

    response.json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find().populate('blogs', {content: 1, date: 1})
    response.json(users)
})


module.exports = usersRouter