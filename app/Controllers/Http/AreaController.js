'use strict'

const Db = use('Database')
const User = use('App/Models/User') //Modelo User
const Area = use('App/Models/Area') //Modelo Area
const Token = use('App/Models/Token')
const {validate} = use('Validator') //Validator


class AreaController {

    async show({params: {id},response,}){

        if (id == null) {
    
            const areas = await Area.all()
            /*const areas = await Db
            .select('*')
            .from('areas')*/

            return response.json({
              message:"hola",
              areas: areas
            })
      
          } else if (id) {

            const area = await Area.find(id)
            return response.status(200).json({
              area:area
            })

          }

    }


    async create({request, response, auth}){

        const input = request.all()
  
        const validation = await validate(request.post(), {
          nombre: 'required|min:1|max:255',
        });
        if (validation.fails()) {
          return validation.messages()
        }
    
        await Area.create(input);
  
        const user_area = await Db
          .table('usuarios_areas')
          .insert({user_id: auth.user.id, area_id: input.id })
  
        return response.status(200).json({
          mensaje: "Se ha creado el area",
          area: await Db.select('*').from('areas').where('nombre', '=', input.nombre)
        })
  
    }

    async showUserAreas({params: {id},response, auth}){
     /* const user = await auth.getUser()
      
      if(id == user.id){

      }*/
        const user_area = await Db
        .select('*')
        .from('usuarios_areas')
        .where('user_id', id) 

        return response.status(200).json({
          usuario_areas: user_area
        })
    }

    async delete({params: {id}, response, auth}){
        
        const user = await auth.getUser()
        const area = await Area.find(id)

        try {
            const user_area = await Db
            .table('usuarios_areas')
            .where({user_id: user.id, area_id: id})
            .delete()

            if (await area.delete()){
                return response.status(200).json({
                    mensaje: "El area se elimino con exito"
                })
            }
            else{
                return response.status(400).json({
                    mensaje: "No se pudo eliminar el area"
                })
            }

           
        
            
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
        

    }
}

module.exports = AreaController
