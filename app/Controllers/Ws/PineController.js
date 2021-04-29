'use strict'

class PineController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(request){    

    this.socket.broadcastToAll("message", request)
    console.log(this.socket.id)
    console.log(request)

  }
}

module.exports = PineController
