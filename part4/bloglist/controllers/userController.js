const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body;

    // validation goes here
    // ex: unique username
    // other validation like: username length, password can do them in frontend
    // but varify here would be better.
    const usernameUnique = await User.findOne({username: username});
    
    if (!(username && password)) {
        return next({
            name:'LengthLimitInvalid',
            message: 'invalid user input'
        })
    }

    if (usernameUnique) {
        return next({
            name:'UsernameUniqueInvalid',
            message:'username exsisted'
        })
    }

    if (username.length < 3 || password.length < 3){
        return next({
            name:'LengthLimitInvalid',
            message: 'invalid user input'
        })
    }


    // 
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);


    const userData = {
        username: request.body.username,
        name: request.body.name,
        passwordHash: passwordHash,
    }

    try {
        const newUser = User(userData);
        const saveUser = await newUser.save()
        response.status(201).json(saveUser)
    } catch (exception) {
        response.status(400).end()
    }
})

userRouter.get('/', async (request, response) => {
    try {
        const result = await User.find({})
        response.json(result);
    } catch (exception) {
        next(exception)
    }
})



module.exports = userRouter;