'use strict'
const Historial = use('App/MongoModels/Historial')

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(request) {
    Historial.create({

      sensor: request.sensor,
      distancia: request.distancia, 
      pir: request.pir,
      humedad:request.humedad,
      temperatura: request.temperatura

     })

    this.socket.broadcastToAll("message", request)

    console.log(this.socket.id)

    console.log(request)

    return "hola"

      /*if(request.nombreSensor){
        const historial = Historial.find({ sensor: request.nombreSensor })
        return response.status(200).json({ data: historial })
      }
      else if(request.nombreSensor == null){
        const historial = Historial.find({ })
        return response.status(200).json({ data: historial })
      }
      
      this.socket.broadcastToAll("message", request)

      console.log(this.socket.id)

      console.log(request)*/

  }

  

}




module.exports = ChatController
