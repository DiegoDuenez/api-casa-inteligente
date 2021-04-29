'use strict'

const ChatController = require("../app/Controllers/Ws/ChatController")

const PineController = require("../app/Controllers/Ws/PineController")

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('prueba', 'ChatController' )

Ws.channel('pines',  'PineController')
//Ws.channel('historial', 'HistorialController')


