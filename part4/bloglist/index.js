const app = require('./app')
const http = require('http')
const loggers = require('./utils/loggers')
const PORT = 3003;
const server = http.createServer(app)

server.listen(PORT, () => {
    loggers.info(`Server is running on port ${PORT}.`)
})