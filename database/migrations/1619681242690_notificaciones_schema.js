'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificacionesSchema extends Schema {
  up () {
    this.create('notificaciones', (table) => {
      table.increments()
      table.string('nombre_autor', 80).notNullable()
      table.string('titulo', 80).notNullable()
      table.string('contenido', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('notificaciones')
  }
}

module.exports = NotificacionesSchema
