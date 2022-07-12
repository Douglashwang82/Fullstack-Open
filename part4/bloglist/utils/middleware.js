const logger =require('./loggers');

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    

    if (error.name === 'UsernameUniqueInvalid') {
        return response.status(400).send({error: 'username already exists in DB'})
    } else if (error.name === 'LengthLimitInvalid') {
        return response.status(400).send({error: 'username and password need to be at least 3'})
    }
}


module.exports = {
    errorHandler
}