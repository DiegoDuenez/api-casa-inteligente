'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.string('email', 254).nullable().unique()
      table.string('password', 60).nullable()
      table.integer('rol_id').unsigned().references('id').inTable('roles')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
