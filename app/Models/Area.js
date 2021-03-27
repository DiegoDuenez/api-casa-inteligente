'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Area extends Model {


    users (){
        return this.belongsToMany('App/Models/User').pivotTable('usuarios_areas')
    }

}

module.exports = Area
