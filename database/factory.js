'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Persona', (faker) => {
     return {
    //id: faker.integer(({ min: 1, max: 40 })),
    id: faker.integer(({ min: 1, max: 5368 })),
    Nombre: faker.first(),
    Apellidos: faker.last(),
    Edad: faker.age({type: 'adult'}),
    Email: faker.email()


        }
    })
