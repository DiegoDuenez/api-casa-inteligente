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



Route.group(() =>{
  // USER
  Route.get('usuarios/:id?', 'UserController.show')
  Route.get('perfil', 'UserController.getUser')
  Route.get('roles/:id?', 'UserController.showRoles')
  // AREA
  Route.get('areas/:id?', 'AreaController.show')
  Route.get('areas/usuario/:id', 'AreaController.showUserAreas')
  Route.get('areas/rol/:id', 'AreaController.showRolesAreas')
  // SENSORES
  Route.get('sensores/area/:id', 'SensorController.showSensoresAreas')
  Route.get('sensores/tipos/:id?', 'SensorController.showSensoresTipos')
  Route.get('sensores/registrados/:id?', 'SensorController.showSensoresRegistrados')
  Route.get('historial/sensor/:id', 'SensorController.showHistorialSensores')
  
}).prefix('mostrar').middleware('auth')

Route.group(() =>{
  // ROL
  Route.post('roles', 'UserController.createRol')
  Route.post('rol/areas', 'UserController.rolAreas')
  // USER - AREA
  Route.post('areas', 'AreaController.create')
  // SENSORES
  Route.post('sensor/tipo', 'SensorController.createSensoresTipos')
  Route.post('sensor/registrado', 'SensorController.createSensoresRegistrados')
  Route.post('sensor/area', 'SensorController.createSensoresAreas')
  Route.post('historial', 'SensorController.createHistorial' )
  Route.post('historial/sensores', 'SensorController.showHistorialMongo')
  Route.post('historial/mongo', 'SensorController.createHistorialMongo')
}).prefix('crear').middleware('auth')


Route.group(() =>{
  // ROL
  Route.delete('rol/:id', 'UserController.deleteRoles')
  // AREA
  Route.delete('areas/:id', 'AreaController.delete')
  Route.delete('rol/:id/area/:idArea', 'AreaController.deleteAreasRol')
  // USER
  Route.delete('usuario/:id', 'UserController.delete' )
  // SENSORES
  Route.delete('area/sensor/:id', 'SensorController.deleteSensoresArea')
  Route.delete('sensor/registrado/:id', 'SensorController.deleteSensorRegistrado')
  Route.delete('sensor/tipo/:id', 'SensorController.deleteSensorTipo')
}).prefix('eliminar').middleware('auth')

Route.group(() =>{
  // USER
  Route.put('usuario/:id', 'UserController.updateUserAuth')
  // ROL
  Route.put('rol/:id', 'UserController.updateRol')
  // AREA
  Route.put('areas/:id', 'AreaController.update')
  // SENSORES
  Route.put('sensor/tipo/:id', 'SensorController.updateSensorTipo')
  Route.put('sensor/registrado/:id', 'SensorController.updateSensorRegistrado')
}).prefix('editar').middleware('auth')


// OTRAS
Route.group(() =>{
  Route.get('roles', 'UserController.getRoles')
})