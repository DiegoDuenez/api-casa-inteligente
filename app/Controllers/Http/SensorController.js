'use strict'

const Sensor = use('App/Models/Sensor') //Modelo Sensor
const Historial = use('App/MongoModels/Historial')
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

    async showSensoresAreas({params: {id}, request, response}){

      if(id){
        const sensores = await Db.table('sensores_areas')
        .innerJoin('areas', 'sensores_areas.area_id', 'areas.id')
        .innerJoin('sensores_registrados', 'sensores_areas.sensor_id', 'sensores_registrados.id')
        .select('sensores_areas.*', "areas.nombre as area_nombre", "sensores_registrados.nombre as sensor_nombre")
        .where('sensores_areas.area_id', '=', id)
        return response.status(200).json({
          sensores_area: sensores
        })
      }
      else {
      
        return response.status(400).json({
          mensaje: "No se encontro sensor en el area"
        })
  
      }

    }

    async showLeds({params: {id}, response, request}){

      if(id == null){
        const leds = await Db.select('*').from('sensores_registrados').where('tipo_id', '=', 1)

        return response.status(200).json({
          leds: leds
        })

      }

    }


    async showHistorialSensores({params: {id} ,request, response}){

      if(id){

        const historial = await Db.table('historiales')
        .innerJoin('sensores_registrados', 'sensores_registrados.id', 'historiales.sensor_id')
        .select('historiales.*','sensores_registrados.nombre')
        .where('sensores_registrados.id', '=', id)

        return response.status(200).json({
          historial: historial
        })

      }
      else {
      
        return response.status(400).json({
          mensaje: "No se encontro historial existente"
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
        .table('sensores_tipos')
        .insert({nombre: input.nombre})

      return response.status(200).json({
        mensaje: "Se ha creado el tipo de sensor",
        sensor: await Db.select('*').from('sensores_tipos').where('id','=', sensor_tipo)
      })

    }

    async createSensoresRegistrados({request, response}){

      const input = request.all()

      const validation = await validate(request.post(), {
        nombre: 'required',
        tipo_id: 'required',
        pin_1: 'required|unique:sensores_registrados, pin_1',
        pin_2: 'number:allowNull|unique:sensores_registrados, pin_2'
      });
      if (validation.fails()) {
        return validation.messages()
      }

      const sensor_reg = await Db
        .table('sensores_registrados')
        .insert({nombre: input.nombre, tipo_id: input.tipo_id, pin_1: input.pin_1, pin_2: input.pin_2})

      return response.status(200).json({
        mensaje: "Se ha creado el nuevo sensor",
        sensor: await Db.select('*').from('sensores_registrados').where('id','=', sensor_reg)
      })

    }

    async createSensoresAreas({request, response}){

      const input = request.all()

      const validation = await validate(request.post(), {
        sensor_id: 'required',
        area_id: 'required'
      });
      if (validation.fails()) {
        return validation.messages()
      }

      const sensor_area = await Db
        .table('sensores_areas')
        .insert({sensor_id: input.sensor_id, area_id: input.area_id})

      return response.status(200).json({
        mensaje: "Se ha creado el nuevo sensor en la habitacion",
        sensor: //await Db.select('*').from('sensores_areas').where('id','=', sensor_area)
        await Db.table('sensores_areas')
        .innerJoin('areas', 'sensores_areas.area_id', 'areas.id')
        .innerJoin('sensores_registrados', 'sensores_areas.sensor_id', 'sensores_registrados.id')
        .select('sensores_areas.*', "areas.nombre as area_nombre", "sensores_registrados.nombre as sensor_nombre")
        .where('sensores_areas.id', '=', sensor_area)
      })

    }

    async createHistorial({request, response}){

      const input = request.all()

      const validation = await validate(request.post(), {
        sensor_id: 'required',
        distancia: 'number:allowNull',
        pir: 'number:allowNull',
        humedad: 'number:allowNull',
        temperatura: 'number:allowNull'
      });
      if (validation.fails()) {
        return validation.messages()
      }

      const historial = await Db
        .table('historiales')
        .insert({sensor_id: input.sensor_id, distancia: input.distancia, pir: input.pir, humedad: input.humedad, temperatura: input.temperatura, created_at :Db.fn.now(),
          updated_at : Db.fn.now()})

        return response.status(200).json({
          mensaje: "Se ha generado historial",
          historial: await Db.table('historiales')
          .innerJoin('sensores_registrados', 'sensores_registrados.id', 'historiales.sensor_id')
          .select('historiales.*','sensores_registrados.nombre')
          .where('sensores_registrados.id', '=', input.sensor_id)
        })

    }

    async showHistorialMongo({response, request}){

      const input = request.all()

      if(input.sensor_id){
        const historial = await Historial.find({ sensor_id: input.sensor_id })
        return response.status(200).json({ data: historial })
      }
      else if(input.sensor_id == null){
        const historial = await Historial.find({ })
        return response.status(200).json({ data: historial })
      }
      
        /*const {id} = params
        const product = await Producto.find(id)*/


    
    }

    async createHistorialMongo({request, response}){

      const input = request.all()

      const obj = {
        "sensor_id":input.sensor_id,
        "distancia":input.distancia,
        "pir":input.pir,
        "humedad": input.humedad,
        "temperatura": input.humedad
      }

        const historial = new Historial(obj)
        await historial.save()
        return response.status(200).json({ message: "se genero historial", data: historial})

    }

    async deleteSensoresArea({params: {id}, response}){

      const sensoresAreas = await Db
      .table('sensores_areas') 
      .where({id: id})
      .delete()

      return response.status(200).json({
        mensaje: "Se ha borrado el sensor del area",
        eliminado: sensoresAreas
      })

    }

    async deleteSensorRegistrado({params: {id}, request, response}){

      const sensorHistorial = await Db
      .table('historiales')
      .where("sensor_id",id)
      .delete()

      const sensoresAreas = await Db
      .table('sensores_areas') 
      .where("sensor_id",id)
      .delete()

      const sensoresReg = await Db
      .table('sensores_registrados') 
      .where("id", id)
      .delete()

      return response.status(200).json({
        mensaje: "Se ha borrado el sensor registrado",
        eliminado: sensoresReg
      })

    }

    async updateSensorTipo({params: {id}, request, response}){

      const input = request.all()

      const validation = await validate(request.all(), {
        nombre: 'required'

      });
      if (validation.fails()) {
        return validation.messages()
      }

      const sensorTipoUPD = await Db
      .table('sensores_tipos')
      .where('id', '=' ,id)
      .update('nombre', input.nombre)

        return response.status(200).json({
          mensaje: "Se actualizo el nombre del tipo de sensor",
          sensor_tipo: sensorTipoUPD
        })

    }

    async updateSensorRegistrado({params: {id}, request, response}){

      const input = request.all()

      const validation = await validate(request.all(), {
        nombre: 'required'

      });
      if (validation.fails()) {
        return validation.messages()
      }

        const sensorRegUpd= await Db
        .table('sensores_registrados')
        .where('id', id)
        .update('nombre', input.nombre)
        return response.status(200).json({
          mensaje: "Se actulizo el nombre del sensor registrrado",
          sensor_reg: sensorRegUpd
        })

    }

    async estatusLed({params: {id}, request, response}){

      const input = request.all()

      const validation = await validate(request.all(), {
        estatus: 'boolean:allowNull'

      });
      if (validation.fails()) {
        return validation.messages()
      }

      const led = await Db
        .table('sensores_registrados')
        .where('id', id)
        .update('estatus', input.estatus)
        return response.status(200).json({
          mensaje: "Se actualizo el estatus del led",
          led: led
        })

    }

    async deleteSensorHistorialMongo({params: {id},response}){

      const eliminar = await Historial.deleteMany({ sensor_id: id})

        return response.status(200).json({
            mensaje: "Se elimino el historial",
            data: eliminar
        })

    }

}

module.exports = SensorController
