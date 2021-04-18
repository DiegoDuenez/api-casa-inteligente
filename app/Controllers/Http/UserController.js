'use strict'

const Db = use('Database')
const User = use('App/Models/User') //Modelo User
const Area = use('App/Models/Area') //Modelo Area
const Token = use('App/Models/Token')
const {validate} = use('Validator') //Validator


class UserController {

  async show({params: {id},response}) {
    
        if (id == null) {
    
          const usuarios = await User.all()
          return response.status(200).json({
            usuarios: usuarios
          })
    
        } else if (id) {
    
          const usuario = await User.find(id)
          return response.status(200).json({
            usuario: usuario
          })
    
        } else {
    
          return response.status(400).json({
            mensaje: "No se encontro al usuario"
          })
    
        }
    
  }

  async create({request, response, auth}){

    const input = request.all()

      const validation = await validate(request.post(), {
        nombre: 'required',
        email: 'nullable',
        password: 'nullable'
      });
      if (validation.fails()) {
        return validation.messages()
      }
  
      const userCreate = await User.create(input);

      /* const user_area = await Db
        .table('usuarios_areas')
        .insert({user_id: auth.user.id, area_id: input.id })*/

      return response.status(200).json({
        mensaje: "Se ha creado el usuario",
        user: userCreate
      })

  }

  async update({response,auth,request,params: {id}}){

      const user = await auth.getUser()
  
      if (user.id == id) {
        
        const input = request.all();
  
        const validation = await validate(request.all(), {
          nombre: 'min:3|max:255',
          email: 'email'
        });
        if (validation.fails()) {
          return validation.messages()
        }
  
        await User.query().where('id', id).update(input)
  
        return response.status(200).json({
          mensaje: "La informacion del usuario se actualizo con exito",
          usuario: user
        })
  
      } 
      else {
        return response.status(400).json({
          mensaje: "No eres este usuario",
        })
      }
  
  } 
    
    
  async getUser({auth,response}) {

      try {
        return await auth.getUser()
      } catch {
        response.send("ningun usuario autenticado")
      }
  }

  async getRoles({response}){
    const roles = await Db
    .select('roles.id', 'roles.nombre')
    .from('roles')


    return response.status(200).json({
      roles: roles
    })
  }

  async delete({params: {id}, response, auth}){
      
    const user = await await Db
    .table('users')
    .where({id: id})
    .delete()


    const user_area = await Db
    .table('usuarios_areas')
    .where({user_id: id})
    .delete()

    return response.status(200).json({
      mensaje: "El usuario se elimino con exito"
    })

    
  }


  // ROLES 

  async createRol({request, response}){
    
    const input = request.all()

    const validation = await validate(request.all(), {
      nombre: 'required',

    });
    if (validation.fails()) {
      return validation.messages()
    }

    const rol = await Db.table('roles').insert({nombre: input.nombre})
    

    return response.status(200).json({
      mensaje: "Rol creado",
      rol: rol
    })

  }

  async rolAreas({request, response}){

   
    const input = request.all()

    const validation = await validate(request.all(), {
      rol_id: 'required',
      area_id: 'required'

    });
    if (validation.fails()) {
      return validation.messages()
    }

    const area = await Db.from("areas").where('id', '=', input.area_id)
    
    const rolArea = await Db.table('roles_habitaciones').insert({rol_id: input.rol_id, area_id: input.area_id})
    

    return response.status(200).json({
      mensaje: "Rol con habitaciones",
      rol: rolArea
    })
    


  }

  async deleteRoles({params: {id}, response, auth}){

    if(auth.user.rol_id == 1){

      const rolAreas = await Db
      .table('roles_habitaciones') 
      .where({rol_id: id})
      .delete()

      const users = await Db
      .table('users')
      .where({rol_id: id})
      .delete()

      const rol = await Db
        .table('roles')
        .where({id: id})
        .delete()

      

        return response.status(200).json({
            mensaje: "El rol se elimino con exito"
        })
        
  


    }



  }




}

module.exports = UserController
