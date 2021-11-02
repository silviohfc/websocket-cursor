const Server = require('./server')

const server = new Server()

server.loadRoutes()
server.run()