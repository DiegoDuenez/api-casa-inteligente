'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('registro', 'Auth/AuthController.register')
Route.post('login', 'Auth/AuthController.login')
Route.get('perfil', 'UserController.getUser')


Route.group(() =>{
  // USER
  Route.get('usuarios', 'UserController.show')
  // AREA
  Route.get('areas/:id?', 'AreaController.show')
  Route.get('areas/usuario/:id', 'AreaController.getUserArea')
}).prefix('mostrar').middleware('auth')

Route.group(() =>{
  // USER - AREA
  Route.post('areas', 'AreaController.create')
}).prefix('crear').middleware('auth')


Route.group(() =>{
  // AREA
  Route.delete('areas/:id', 'AreaController.delete')
}).prefix('eliminar').middleware('auth')




// OTRAS
Route.group(() =>{
  Route.get('roles', 'UserController.getRoles')
})