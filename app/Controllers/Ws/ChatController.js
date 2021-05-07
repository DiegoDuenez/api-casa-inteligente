'use strict'
const Historial = use('App/MongoModels/Historial')

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(request) {
    Historial.create({
      sensor_id: request.sensor_id,
      distancia: request.distancia, 
      pir: request.pir,
      humedad:request.humedad,
      temperatura: request.temperatura,
      led: request.led
     })

    this.socket.broadcastToAll("message", request)

    console.log(this.socket.id)

    console.log(request)

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
