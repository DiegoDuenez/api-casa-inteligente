'use strict'

/*
|--------------------------------------------------------------------------
| SensorTipoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class SensorTipoSeeder {
  async run () {
    await Factory.get('sensores_tipos').create()
  }
}

module.exports = SensorTipoSeeder
