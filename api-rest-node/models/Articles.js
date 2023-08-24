const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    imagen: {
        type: String,
        default: "default.png"
    }
});

//Nombre para exportar, nose, nombre en DB
module.exports = model("Article", ArticleSchema, "articles");
