const express = require('express');
const multer = require('multer');
const ArticleController = require('../controllers/article');

const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imgs/articles');
    },
    filename: (req, file, cb) => {
        cb(null, 'article'+ Date.now() + file.originalname);
    }
});

const subidas = multer({storage:almacenamiento});

// Rutas de pruebas
router.get("/ruta-de-prueba", ArticleController.prueba);
router.get("/curso", ArticleController.curso);

// Ruta util
router.post("/crear", ArticleController.crear)
router.get("/articles/:ultimos?", ArticleController.listar)
router.get("/article/:id", ArticleController.consultar)
router.delete("/article/:id", ArticleController.eliminar)
router.put("/article/:id", ArticleController.editar)
// "file0" es la key que se usara en postman o en el back para subir. 
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticleController.subir)
router.get("/imagen/:fichero", ArticleController.imagen)
router.get("/buscar/:busqueda", ArticleController.buscador)

module.exports = router;


