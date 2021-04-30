'use strict'

const Db = use('Database')
const Notificacion = use('App/MongoModels/Notificacion')

class NotificacionController {

    async show({response}){


        const notificaciones= await Notificacion.find({ })
        return response.status(200).json({ data: notificaciones })
        
        

    }

    async countNotificaciones({response}){
        
        const cantidad = await Notificacion.count({})

        return response.status(200).json({
            mensaje: "Notificaciones",
            data: cantidad
        })
    }

    async deleteNotificacion({params: {nombre},response}){
        
        const eliminar = await Notificacion.deleteMany({ nombre_autor: nombre})

        return response.status(200).json({
            mensaje: "Se elimino la notificación",
            data: eliminar
        })
    
    }
}

module.exports = NotificacionController
