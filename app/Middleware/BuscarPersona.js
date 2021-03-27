'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Persona = use('App/Models/Persona') //Modelo Persona

class BuscarPersona {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    const persona = await Persona.find(id)
    
    if(id == null){
      const personas = await Persona.all()
      return response.status(200).json({
          Personas: personas
          
      })
  }
  if(!persona){
      return response.status(404).json({
        mensaje: "Ingrese un ID valido"
      })
  }
    
  
    
    
    


    request.body.persona = persona

    await next()
  }
}

module.exports = BuscarPersona
