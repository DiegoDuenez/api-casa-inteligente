'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorialSchema extends Schema {
  up () {
    this.create('historiales', (table) => {
      table.increments()
      table.integer('sensor_id').unsigned().references('id').inTable('sensores_registrados')
      table.decimal('distancia', 10, 4).nullable()
      table.integer('pir').nullable()
      table.decimal('humedad', 10, 4).nullable()
      table.decimal('temperatura', 10, 4).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('historiales')
  }
}

module.exports = HistorialSchema
