'use strict'

const Notificacion = require("../../MongoModels/Notificacion")

class NotificacionController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(request){

    Notificacion.create({

      nombre_autor: request.nombre_autor,
      titulo: request.titulo,
      contenido: request.contenido

     })

    this.socket.broadcastToAll("message", request)

    console.log(this.socket.id)

    console.log(request)

  }
}

module.exports = NotificacionController
