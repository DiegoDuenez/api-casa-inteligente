'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SensoresTiposSchema extends Schema {
  up () {
    this.create('sensores_tipos', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sensores_tipos')
  }
}

module.exports = SensoresTiposSchema
