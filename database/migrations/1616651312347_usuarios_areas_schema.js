'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosAreasSchema extends Schema {
  up () {
    this.create('usuarios_areas', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('area_id').references('id').inTable('areas')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios_areas')
  }
}

module.exports = UsuariosAreasSchema
