/*  Archivo controllers/usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

const mongoose = require("mongoose");
// importamos el modelo de usuarios
const Usuario = mongoose.model("Usuario");
const passport = require('passport');

// C => CREATE
function crearUsuario(req, res, next) {
  const body = req.body;
  const password = body.password;

  delete body.password;
  // Instanciaremos un nuevo usuario utilizando la clase usuario
  const usuario = new Usuario(body);

  usuario.crearPassword(password);

  console.log("Aquí estoy...");

  usuario.save()
    .then(user => res.status(200).json(user.toAuthJSON()))
    .catch(next);
}

// R => READ
function obtenerUsuarios(req, res, next) {

  Usuario.findById(req.usuario.id)
    .then(user => {
      if(!user) return res.sendStatus(401);
      return res.json(user.publicData());
    })
    .catch(next)


  /* if(req.params.id){
    // La función findById() nos busca un id
    Usuario.findById(req.params.id)
    .then(user => {res.send(user)})
    .catch(next);
  } else {
    // La función find() muestra todos los documentos de la colección
    Usuario.find()
    .then(users => {res.send(users)})
    .catch(next);
  } */
}

// U => UPDATE
function modificarUsuario(req, res, next) {
 /* Usuario.findById(req.params.id)
 .then(user => {
   if(!user) return res.sendStatus(401); // Verificar si existe sendStatus
   let nuevaInfo = req.body;

   if(typeof nuevaInfo.username !== "undefined"){
     user.username = nuevaInfo.username;
   }

   if(typeof nuevaInfo.nombre !== "undefined"){
     user.nombre = nuevaInfo.nombre;
   }

   if(typeof nuevaInfo.apellido !== "undefined"){
     user.apellido = nuevaInfo.apellido;
   }

   if(typeof nuevaInfo.email !== "undefined"){
     user.email = nuevaInfo.email;
   }

   if(typeof nuevaInfo.tipo !== "undefined"){
     user.tipo = nuevaInfo.tipo;
   }
   user.save()
   .then(updated => {res.status(200).json(updated.publicData())})
   .catch(next)
 })
 .catch(next) */

 Usuario.findById(req.usuario.id)
 .then(user => {
   if(!user) return res.sendStatus(401); // Verificar si existe sendStatus
   let nuevaInfo = req.body;

   if(typeof nuevaInfo.username !== "undefined"){
     user.username = nuevaInfo.username;
   }

   if(typeof nuevaInfo.nombre !== "undefined"){
     user.nombre = nuevaInfo.nombre;
   }

   if(typeof nuevaInfo.apellido !== "undefined"){
     user.apellido = nuevaInfo.apellido;
   }

   if(typeof nuevaInfo.email !== "undefined"){
     user.email = nuevaInfo.email;
   }

   if(typeof nuevaInfo.tipo !== "undefined"){
     user.tipo = nuevaInfo.tipo;
   }

   if(typeof nuevaInfo.password !== "undefined"){
    user.crearPassword(nuevaInfo.password);
  }
   user.save()
   .then(updated => {res.status(201).json(updated.publicData())})
   .catch(next)
 })
 .catch(next)
}

// D => DELETE
function eliminarUsuario(req, res, next) {
  /* Usuario.findOneAndDelete({_id: req.params.id})
  .then(r => {res.status(200).send("El usuario ha sido eliminado.")})
  .catch(next) */

  Usuario.findOneAndDelete({_id: req.usuario.id})
  .then(r => {res.status(200).send("El usuario ha sido eliminado.")})
  .catch(next);
}

// LOGIN
function iniciarSesion(req, res, next){
  if(!req.body.email || !req.body.password){
    return res.status(422).json({error: {email : 'Falta información'}});
  }

  passport.authenticate('local', { session: false}, 
  function (err, user, info){
    if(err) return next(err);
    if(user){
      user.token = user.generaJWT();
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next)
}

// exportamos las funciones definidas
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion
}
