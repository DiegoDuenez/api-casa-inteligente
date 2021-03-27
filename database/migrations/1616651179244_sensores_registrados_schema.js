'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SensoresRegistradosSchema extends Schema {
  up () {
    this.create('sensores_registrados', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.integer('tipo_id').unsigned().references('id').inTable('sensores_tipos')
      table.timestamps()
    })
  }

  down () {
    this.drop('sensores_registrados')
  }
}

module.exports = SensoresRegistradosSchema
