const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const userController = require('./controllers/userController')
const blogController = require('./controllers/blogController')
const config = require('./utils/config')
const loggers = require('./utils/loggers')
const middlewares = require('./utils/middleware')
const dbURL = config.NODE_DEV === 'test' ? config.TEST.MONGODB_URL : config.MONGODB_URL;
mongoose
    .connect(dbURL)
    .then(() => loggers.info(`Connected to DB`))
    .catch(error => logger.error(`Error: ${error}`))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogController);
app.use('/api/user', userController)

app.use(middlewares.errorHandler);
module.exports = app;