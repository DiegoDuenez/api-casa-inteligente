'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AreaSchema extends Schema {
  up () {
    this.create('areas', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('areas')
  }
}

module.exports = AreaSchema
