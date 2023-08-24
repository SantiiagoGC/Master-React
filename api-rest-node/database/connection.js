const mongoose = require('mongoose');

const connection = async () => {

    try {
        
        await mongoose.connect('mongodb://127.0.0.1:27017/mi_blog');

        // Parametro dentro de objeto
        // useNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

        console.log("Conectado correctamente a la DB");

    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos.");
    }

}

module.exports = {
    connection
}