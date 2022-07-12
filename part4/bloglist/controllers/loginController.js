const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')


loginRouter.post('/', async (request, response, next) => {
    const {username, password} = request.body;
    
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false
    : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)){
        return next({message: "invalid username or password", name:"InvalidCredential"})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jsonwebtoken.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({token, username: user.username, name: user.name})
    
})

module.exports = loginRouter;