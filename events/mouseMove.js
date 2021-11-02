class MouseMoveEvent {
  constructor(socket) {
    this.socket = socket
  }

  handle() {
    this.socket.on('mouseMove', coords => {
      this.socket.broadcast.emit('drawMouse', coords)
    })
  }
}

module.exports = MouseMoveEvent