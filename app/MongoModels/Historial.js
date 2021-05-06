'use strict'
 
const mongoose = use('Mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed
 
let historialSchema = mongoose.Schema({
  sensor_id: { type: Number, default: '' },
  distancia: { type: Number, default: '' },
  pir: { type: Number, default: '' },
  humedad: { type: Number, default: '' },
  temperatura: { type: Number, default: '' },
}, {
  timestamps: true
})
 
module.exports = mongoose.model('Historial', historialSchema)