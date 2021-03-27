'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SensoresAreasSchema extends Schema {
  up () {
    this.create('sensores_areas', (table) => {
      table.increments()
      table.integer('sensor_id').unsigned().references('id').inTable('sensores_registrados')
      table.string('area_id').references('id').inTable('areas')
      table.timestamps()
    })
  }

  down () {
    this.drop('sensores_areas')
  }
}

module.exports = SensoresAreasSchema
