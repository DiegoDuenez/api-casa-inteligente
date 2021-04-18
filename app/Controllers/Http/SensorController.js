'use strict'

const Sensor = use('App/Models/Sensor') //Modelo Sensor
const Area = use('App/Models/Area') //Modelo Area
const Db = use('Database')
const {validate} = use('Validator') //Validator

class SensorController {

    async showSensoresTipos({params: {id}, request, response}){

        if (id == null) {
    
            const sensores = await Db
            .select('*')
            .from('sensores_tipos') 
            return response.status(200).json({
              sensores_tipos: sensores
            })
      
          } else if (id) {
      
            const sensor = await await Db
            .select('*')
            .from('sensores_tipos')
            .where('id', '=', id) 
            return response.status(200).json({
              sensor_tipo: sensor
            })
      
          } else {
      
            return response.status(400).json({
              mensaje: "No se encontro al tipo de sensor"
            })
      
          }

    }

    async showSensoresRegistrados({params: {id}, request, response}){

        if (id == null) {
    
            const sensores = await Db
            .select('*')
            .from('sensores_registrados') 
            return response.status(200).json({
              sensores_registrados: sensores
            })
      
          } else if (id) {
      
            const sensor = await Db
            .select('*')
            .from('sensores_registrados')
            .where('id', '=', id) 
            return response.status(200).json({
              sensor_registrado: sensor
            })
      
          } else {
      
            return response.status(400).json({
              mensaje: "No se encontro al tipo de sensor"
            })
      
          }

    }

    async createSensoresTipos({request, response}){

      const input = request.all()

      const validation = await validate(request.post(), {
        nombre: 'required|unique:sensores_tipos,nombre',
      });
      if (validation.fails()) {
        return validation.messages()
      }

      const sensor_tipo = await Db
        .table('usuarios_areas')
        .insert({nombre: input.nombre})

      return response.status(200).json({
        mensaje: "Se ha creado el tipo de sensor",
        sensor: sensor_tipo
      })

    }

}

module.exports = SensorController
