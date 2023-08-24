const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App iniciando...");

// Conectar a la DB
connection();

// Crear servidor Node
const app = express();
port = 3900;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({extended : true})); // Convertir de JSON para formulario normal form-urlencoded


// RUTAS
const rutas_article = require("./routes/article");

// Cargar las rutas
app.use("/api", rutas_article);

// Crear rutas "probandos"
app.get("/probando", (req, res) => {
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
            }
        ]
    )
});

app.get("", (req, res) => {

    return res.status(200).send(`
        <h1>Empezando API</h1>
    `);
});


// Crear servidor y escuchar peticiones de HTTP
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: "+port);
});