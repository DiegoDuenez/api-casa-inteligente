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


}

module.exports = UserController
