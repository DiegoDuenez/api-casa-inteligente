'use strict'

const User = use('App/Models/User') //Modelo User
const Token = use('App/Models/Token')
const {validate} = use('Validator') //Validator

class AuthController {

    async register({request, response}) {
        const input = request.all();
        const validation = await validate(request.post(), {
          nombre: 'required|min:3|max:255',
          email: 'required|email|unique:users,email',
          password: 'required',
          rol_id: 'required|number'
        });
        if (validation.fails()) {
          return validation.messages()
        }
    
        await User.create(input);
    
    
        return response.status(200).json({
          mensaje: "Se ha registrado al usuario",
          usuario: User
        })
    
    }

    async login({request, response,auth}) {

        let input = request.all()
        let token = await auth.withRefreshToken().attempt(input.email, input.password)
        return response.json({
            token,
            mensaje: "Inicio de sesion correcto"
        })

    }
}

module.exports = AuthController
