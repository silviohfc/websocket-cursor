const { Server } = require('socket.io')
const { promisify } = require('util')
const fs = require('fs')

class SocketServer {
  #app
  #port
  constructor() {
    this.#app = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })
    this.#port = 3333
  }

  async loadRoutes() {
    const readdir = promisify(fs.readdir)
    const eventFiles = await readdir('./events')
    this.#app.on('connection', socket => {
      for (const eventFile of eventFiles) {
        const Event = require(`./events/${eventFile}`)
        new Event(socket).handle()
      }
    })
  }

  run() {
    this.#app.listen(this.#port)
    console.log(`Server is running on port ${this.#port}`)
  }
}

module.exports = SocketServer