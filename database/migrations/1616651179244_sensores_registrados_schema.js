'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SensoresRegistradosSchema extends Schema {
  up () {
    this.create('sensores_registrados', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.integer('tipo_id').unsigned().references('id').inTable('sensores_tipos')
      table.integer('pin_1').notNullable().unique()
      table.integer('pin_2').nullable().unique()
      table.boolean('estatus').defaultTo(0).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sensores_registrados')
  }
}

module.exports = SensoresRegistradosSchema
