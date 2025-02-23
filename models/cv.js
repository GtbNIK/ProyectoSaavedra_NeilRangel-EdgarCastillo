const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cvSchema = new Schema({
    userId: { type: String, required: true },
    photo: { type: String }, // Campo explícito para la URL de la foto
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // ... resto de los campos ...
});

module.exports = mongoose.model('CV', cvSchema); 