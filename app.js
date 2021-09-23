// Express
const express = require("express");
const app = express();

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

mongoose.set("debug", true);

/*********************** Mongoose Configuration *******************************/

//Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Modelos - Esquemas, sw tienen que cargar antes de las rutas
require("./models/Usuario");
require("./models/Mascota");
require("./models/Solicitud");
require("./config/passport");

// Configurando las rutas
app.use("/v1", require("./routes"));

// Iniciando el servidor
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
