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
      const user_rol = await Db.select('users.rol_id').from('users').where('id','=', id)
      const areas = await Db
      .table('users')
      .innerJoin('roles', 'roles.id', 'users.rol_id')
      .innerJoin('roles_habitaciones', 'roles_habitaciones.rol_id', 'roles.id')
      .innerJoin('areas', 'areas.id', 'roles_habitaciones.area_id')
      .select('areas.*').where('users.id', '=', id)
        /*const user_area = await Db
        .select('*')
        .from('usuarios_areas')
        .where('user_id', id) 

        return response.status(200).json({
          usuario_areas: user_area
        })*/
        return response.status(200).json({
          usuario_areas: areas
        })
    }

    async showRolesAreas({params: {id}, response}){

      const rol_areas = await Db
      .table("roles")
      .innerJoin('roles_habitaciones', 'roles_habitaciones.rol_id', 'roles.id')
      .innerJoin('areas', 'areas.id', 'roles_habitaciones.area_id')
      .select("areas.nombre as areaNombre", 'roles.nombre as rolNombre', 'areas.id as area_id', 'roles.id as rol_id').where('roles.id', '=', id)

      return response.status(200).json({
        rol_areas: rol_areas
      })

    }

    async update({params: {id}, request, response}){

      const input = request.all()

      const validation = await validate(request.all(), {
        nombre: 'required'

      });
      if (validation.fails()) {
        return validation.messages()
      }

        const areaUpd = await Db.table('areas').where('id', id).update('nombre', input.nombre)
        return response.status(200).json({
          mensaje: "Se actulizo el nombre del area",
          area: areaUpd
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

            const rol_area = await Db
            .table('roles_habitaciones')
            .where('area_id', id)
            .delete()

            const sensor_area = await Db
            .table('sensores_areas')
            .where('area_id', id)
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

    async deleteAreasRol({params:{id, idArea}, request, response}){

      const areas_rol = await Db
      .table('roles_habitaciones')
      .where({rol_id:id, area_id: idArea})
      .delete()

      return response.status(200).json({
        mensaje: "El area ya no pertenece al rol",
        area: areas_rol

    })
    }
}

module.exports = AreaController
