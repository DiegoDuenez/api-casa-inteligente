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
  Route.get('areas/usuario/:id', 'AreaController.showUserAreas')
  // SENSORES
  Route.get('sensores/area/:id', 'SensorController.showSensoresAreas')
  Route.get('sensores/tipos/:id?', 'SensorController.showSensoresTipos')
  Route.get('sensores/registrados/:id?', 'SensorController.showSensoresRegistrados')
  Route.get('historial/sensor/:id', 'SensorController.showHistorialSensores')
}).prefix('mostrar').middleware('auth')

Route.group(() =>{
  Route.post('roles', 'UserController.createRol')
  Route.post('rol/areas', 'UserController.rolAreas')
  // USER - AREA
  Route.post('areas', 'AreaController.create')
  // SENSORES
  Route.post('sensor/tipo', 'SensorController.createSensoresTipos')
  Route.post('sensor/registrado', 'SensorController.createSensoresRegistrados')
  Route.post('sensor/area', 'SensorController.createSensoresAreas')
  Route.post('historial', 'SensorController.createHistorial' )
}).prefix('crear').middleware('auth')


Route.group(() =>{
  Route.delete('rol/:id', 'UserController.deleteRoles')
  // AREA
  Route.delete('areas/:id', 'AreaController.delete')
  // USER
  Route.delete('usuario/:id', 'UserController.delete' )
}).prefix('eliminar').middleware('auth')




// OTRAS
Route.group(() =>{
  Route.get('roles', 'UserController.getRoles')
})