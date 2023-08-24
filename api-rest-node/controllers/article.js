const { validarArticle } = require('../helpers/validacionArticle');
const Article = require("../models/Articles");
const fs = require('fs');
const path = require('path');

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Mensaje de prueba en el controlador de Articles."
    });
}

const curso = (req, res) => {
    console.log("Probando");

    return res.status(200).json(
        [
            {
                curso: "Master en React",
                autor: "Santiago Garcia Cañas"
            },
            {
                curso: "Master en Node",
                autor: "Santiago Garcia Cañas"
            },
        ]);
};

const crear = async function (req, res) {

    // Recoger parametros por post a guardar
    let parametros = req.body;

    // Validar datos
    try {
        validarArticle(parametros);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: "Faltan datos por enviar"
        });
    }

    // Crear el objeto a guardar
    const article = new Article(parametros);

    // Asginar valores a objeto basado en el modelo (manual o automatico)
    // Manual = article.titulo = parametros.titulo;

    // Guardar en la DB
    //Guardar el artículo en la base de datos
    try {
        await article.save();
        return res.status(200).json({
            status: "success",
            article: article,
            msg: "Artículo guardado con éxito."
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "No se ha guardado el artículo."
        });
    }

};

const listar = async function (req, res) {
    try {
        let consulta = Article.find({}).sort({ fecha: -1 });

        if (req.params.ultimos && !isNaN(req.params.ultimos)) {
            consulta = consulta.limit(req.params.ultimos);
        }

        const articles = await consulta.exec();

        return res.status(200).json({
            status: "success",
            articles: articles,
            contador: articles.length,
            msg: "Artículos encontrados con éxito."
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "No se han encontrado los artículos."
        });
    }
}

const consultar = async function (req, res) {
    // Recoger un ID por la url
    let id = req.params.id;

    // Buscar el articulo
    try {
        const consulta = await Article.findById(id).exec();
        if (consulta != null) {
            return res.status(200).json({
                status: "success",
                article: consulta
            });
        } else {
            return res.status(404).json({
                status: "error",
                msg: "No se ha encontrado el artículo."
            });
        }
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "No se ha encontrado el artículo."
        });
    }

};

const eliminar = async function (req, res) {

    let id = req.params.id;

    try {
        const articleDelete = await Article.findOneAndDelete({ _id: id }).exec();
        if (articleDelete != null) {
            return res.status(200).json({
                status: "success",
                article: articleDelete,
                msg: "Artículo eliminado con éxito."
            });
        } else {
            return res.status(400).json({
                status: "error",
                msg: "No se ha eliminado el artículo."
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "No se ha eliminado el artículo."
        });
    }
};

const editar = async function (req, res) {

    // Recoger id articulo
    let id = req.params.id;

    // Recoger datos del body
    let parametros = req.body;

    // Buscar y actualizar articulo
    try {
        // Validar datos
        validarArticle(parametros);

        let consulta = await Article.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (consulta != null) {
            return res.status(200).json({
                status: 'success',
                mensaje: "Articulo actualizado.",
                article: consulta
            });
        } else {
            return res.status(500).json({
                status: 'error',
                mensaje: "Error al actualizar los datos 1."
            });
        }
    } catch (error) {
        // Devolver respuesta
        return res.status(400).json({
            status: 'error',
            mensaje: "Faltan datos por enviar"
        });
    }
};

const subir = async function (req, res) {
    // Configurar multer para la subida de archivos

    // Recoger el fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida."
        });
    }

    // Nombre del archivo
    let archivo = req.file.originalname;

    // Extension del archivo
    let archivo_split = archivo.split("\.");
    let extension = archivo_split[1];

    // Comprobar que la extención sea correcta
    if (extension != "png" && extension != "jpg" && extension != "jpeg"
        && extension != "gif") {
        // Borrar archivo y dar respues
        fs.unlink(req.file.path, () => {
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen invalida.",
            })
        })
    } else {
        // Si todo va bien, actualizar el articulo

        // Recoger id articulo
        let id = req.params.id;

        // Buscar y actualizar articulo
        try {
            let consulta = await Article.findOneAndUpdate({ _id: id }, { imagen: req.file.filename },
                { new: true });
            if (consulta != null) {
                return res.status(200).json({
                    status: 'success',
                    mensaje: "Articulo actualizado.",
                    article: consulta,
                    ficheroSubido: req.file
                });
            } else {
                // Devolver una respuesta
                return res.status(500).json({
                    status: 'error',
                    mensaje: "Error al encontrar el articulo."
                });
            }
        } catch (error) {
            // Devolver respuesta
            return res.status(400).json({
                status: 'error',
                mensaje: "Fallo al actualizar la imagen."
            });
        }
    }
};

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imgs/articles/" + fichero;

    // access da problema con la ruta creo pq lo pone a uno desde C:/
    fs.stat(ruta_fisica, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica));
        } else {
            return res.status(404).json({
                status: 'error',
                mensaje: "La imagen no existe.",
                existe,
                fichero,
                ruta_fisica,
                error: error
            });
        }
    })
}

const buscador = async function (req, res) {
    // Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    try {
        // Find OR ---> i = iterador
        let articles = await Article.find({
            "$or": [
                { "titulo": { "$regex": busqueda, "$options": "i" } },
                { "contenido": { "$regex": busqueda, "$options": "i" } }
            ]
        })
            // Orden
            .sort({ fecha: -1 })
            .exec();
        if(articles == "" || !articles || articles.length <= 0){
            return res.status(404).json({
                status: "Not Found",
                mensaje: "No se han encontrado articulos."
            });
        }

        return res.status(200).json({
            status: "OK",
            articles
        });
            
    } catch (error) {
        return res.status(404).json({
            status: "Not Found",
            mensaje: "Error al buscar articulos.",
            error : error.message
        });
    }

    // Ejecutar consulta

    // Devolver resultado
};

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    consultar,
    eliminar,
    editar,
    subir,
    imagen,
    buscador
}