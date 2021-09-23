/* Modelación de Usuario con Mongoose */
const mongoose = require("mongoose");
/* Unique Validator es una librería que nos ayuda a validar que no existan valores repetidos
 que se les específico con 'unique' */
const uniqueValidator = require("mongoose-unique-validator");

/* Crypto es una librería que ofrece diferentes algortimos de cifrado */
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/* Secret nos permite decidir en qué ambiente cifraremos nuestro password */
const secret = require("../config").secret;

/* La opción { timestamps: true } agrega automáticamente la hora y 
fecha de creación (createdAt and updatedAt) cada que se crea o actualiza un documento.
collection es en donde se define la colección de la base de datos 
a donde apunta este esquema. */

// Creación del Modelo Usuario con new mongoose.Schema()
const UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Es de tipo string
      unique: true, // Mi username debe ser único y se usa con unique validator
      required: [true, "No puede estar vacío el campo username."], // Debe ser obligatorio el username y especificar el mensaje de error
      lowercase: true, // Queremos que todos los carácteres sean en minúscula
      match: [/^[a-z0-9]+$/, "Username inválido."], // Se especifica la expresión regular para que cumpla con ella y en caso de que no lo haga, se mostrará el msj de error
      // Sólo se permite carácteres en letras y números
      index: true,
    },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true, // El valor de email debe ser único y se usa con unique validator
      required: [true, "Falta email."], // Es obligatorio el campo email
      match: [/\S+@\S+.\S+/, "Email inválido."], // S significa cualquier símbolo
      /* Cuando indexamos estamos optimizando nuestras consultas, lo que hace es guardar este índice en otro tipo de memoria, 
      que es de más rápido acceso para que podamos reolver las consultas más rápido */
      index: true,
    },
    tipo: { type: String, enum: ["normal", "anunciante"] },
    hash: String, // Texto cifrado que representa nuestra contraseña
    salt: String, // Semilla para generar nuestra contraseña
  },
  { timestamps: true, collection: "usuarios" }
);

/* Aquí se llama la librería unique validator, una vez que se terminó de definir el modelo */
UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe." });

// Con este método especificamos que datos queremos que sean públicos
UsuarioSchema.methods.publicData = function () {
  return {
    id: this._id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo: this.tipo,
  };
};

/* Definir un método que nos permita gaurdar nuestra contraseña de forma segura,
es decir, cifrar nuestra contraseña y luego guardarla en nuestra bd. Cuando 
ciframos siempre se requiere una semilala (salt)*/
UsuarioSchema.methods.crearPassword = function (password) {
  /* Definimos de forma aleatoria un número en formato hexadecimal, ésta será la semilla,
  y por ello es importante que se encuentra en la definición del esquema del usuario */
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

/* Validar la contraseña, es decir, descrifrarla */
UsuarioSchema.methods.validarPassword = function (password){
  const newHash = crypto
  .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
  .toString("hex");

  return this.hash === newHash;
}

/* Generar un token de autenticación */
UsuarioSchema.methods.generaJWT = function (){
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate()+60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime()/1000)
  }, secret);
}

/* Definir un JWT en un JSON, que se le enviará al usuario */
UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generaJWT()
  }
}

// Haciendo referencia que cada vez que usemos el Modelo Usuario nos referimos al UsuarioSchema
mongoose.model("Usuario", UsuarioSchema);
