const mongoose = require('mongoose');

const FrutaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true }
});

module.exports = mongoose.model('Fruta', FrutaSchema);
