'use strict'

const Db = use('Database')
const Notificacion = use('App/MongoModels/Notificacion')

class NotificacionController {

    async show({response}){


        const notificaciones= await Notificacion.find({ })
        return response.status(200).json({ data: notificaciones })
        
        

    }

    async countNotificaciones({response}){
        
        const cantidad = Notificacion.count({})

        return response.status(200).json({
            mensaje: "Notificaciones",
            data: cantidad
        })
    }
}

module.exports = NotificacionController
