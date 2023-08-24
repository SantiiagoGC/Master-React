const validator = require("validator");

const validarArticle = (parametros) => {

    // Validar datos
    let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 5, max: 25 });
    let validar_contenido = !validator.isEmpty(parametros.contenido) && validator.isLength(parametros.contenido, { min: 5, max: 100 });

    if (!validar_titulo || !validar_contenido) {
        throw new Error("Error al validar la información.");
    }

};

module.exports = {
    validarArticle
}