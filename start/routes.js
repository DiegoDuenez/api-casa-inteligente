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

Route.post('login', 'Auth/AuthController.login')
Route.post('registro', 'Auth/AuthController.register').middleware('auth')
Route.get('sensores/registrados/:id?', 'SensorController.showSensoresRegistrados')

Route.group(() =>{
  // USER
  Route.get('usuarios/:id?', 'UserController.show')
  Route.get('perfil', 'UserController.getUser')
  Route.get('roles/:id?', 'UserController.showRoles')
  // AREA
  Route.get('areas/:id?', 'AreaController.show')
  Route.get('areas/usuario/:id', 'AreaController.showUserAreas')//
  Route.get('areas/rol/:id', 'AreaController.showRolesAreas')
  // SENSORES
  Route.get('sensores/area/:id', 'SensorController.showSensoresAreas')
  Route.get('sensores/tipos/:id?', 'SensorController.showSensoresTipos')
  Route.get('sensores/registrados/:id?', 'SensorController.showSensoresRegistrados')
  Route.get('historial/sensor/:id', 'SensorController.showHistorialSensores')
  Route.get('historial/sensores/:id', 'SensorController.showHistorialMongoGet')

  // NOTIFICACIONES
  Route.get('notificaciones', 'NotificacionController.show')
  Route.get('cantidad/notificaciones', 'NotificacionController.countNotificaciones')
  Route.get('leds/:id?', 'SensorController.showLeds')
  
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
  // NOTIFICACION
  Route.delete('notificacion/:nombre', 'NotificacionController.deleteNotificacion')
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
  Route.delete('historial/sensor/:id', 'SensorController.deleteSensorHistorialMongo' )
  //Route.delete('sensor/tipo/:id', 'SensorController.deleteSensorTipo')
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
  Route.put('led/estatus/:id', 'SensorController.estatusLed')
}).prefix('editar').middleware('auth')


