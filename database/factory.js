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
const Hash = use('Hash')

Factory.blueprint('roles', async () =>{
    return {
        nombre: "administrador"
    }
}) 

Factory.blueprint('sensores_tipos', async () =>{
    return {
        nombre: "led"    }
}) 

Factory.blueprint('App/Models/User', async () => {
     return {
    //id: faker.integer(({ min: 1, max: 40 })),
    nombre: "diegoAdmin",
    email: "diego@admin.com",
    password: "password",
    rol_id: 1


        }
    })
