'use strict'
 
const mongoose = use('Mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed
 
let notificacionSchema = mongoose.Schema({
  nombre_autor: { type: String, default: '' },
  titulo: { type:  String, default: '' },
  contenido: { type: String, default: '' },
}, {
  timestamps: true
})
 
module.exports = mongoose.model('Notificacion', notificacionSchema)