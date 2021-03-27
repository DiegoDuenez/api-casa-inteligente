'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Persona = use('App/Models/Persona') //Modelo Persona

class Edad {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params }, next) {
    //const edad = request.Edad()
    //console.log("Middleware funciona!")
    const edad = request.param('Edad')

    if(edad <= 17){
      console.log("Middleware funciona!")
      return response.status(404).json({
        aviso:"La persona que se registra debe ser mayor de edad (+18)"
      })
      
    }

    //request.body.persona = persona

    await next()
  }
}

module.exports = Edad
