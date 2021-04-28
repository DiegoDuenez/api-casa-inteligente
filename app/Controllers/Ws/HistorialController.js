'use strict'

const Historial = use('App/MongoModels/Historial')

class HistorialController {
  constructor ({ socket, request, response }) {
    this.socket = socket
    this.request = request
    this.response = response
  }

  onMessage(request){

    /*const input = request.all()

      if(input.nombreSensor){
        const historial = Historial.find({ sensor: input.nombreSensor })
        return response.status(200).json({ data: historial })
      }
      else if(input.nombreSensor == null){
        const historial = Historial.find({ })
        return response.status(200).json({ data: historial })
      }*/

      Historial.find({ sensor: request.nombreSensor })  

      this.socket.broadcastToAll("message", request)

      console.log(this.socket.id)

      console.log(request)

      

  }

}

module.exports = HistorialController
