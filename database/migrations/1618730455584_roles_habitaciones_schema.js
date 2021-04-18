'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesHabitacionesSchema extends Schema {
  up () {
    this.create('roles_habitaciones', (table) => {
      table.increments()
      table.integer('rol_id').unsigned().references('id').inTable('roles')
      table.integer('area_id').unsigned().references('id').inTable('areas')
      table.timestamps()
    })
  }

  down () {
    this.drop('roles_habitaciones')
  }
}

module.exports = RolesHabitacionesSchema
