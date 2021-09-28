//Importando passport, middleware para autenticación.
const passport = require('passport');

/* Passport nos sirve para el manejo de sesiones. 
  Éste archivo nos servirá ya que configuraremos lo necesario para que Passport funcione
*/
//Importando estrategia autenticación. --> passport-local
/* LocalStrategy es una estrategia de autenticación */
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

//Configurando elementos utilizados para habilitar sesión.
passport.use(new LocalStrategy({
  /* Campos necesarios para saber quién se está loggeando, estará en formato JSON.
  El valor es cómo se encuentran en la base de datos.
  */
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, next) {
  /* Buscar al usuario loggeado */
  Usuario.findOne({ email: email })
  .then(function (user) {
    /* En caso de que no exista el usuario o esté mal la contraseña... */
    if (!user || !user.validarPassword(password)) {
      /* Regreso: null, falso porque no estoy dando la autorización para ingresar,
       no hay correspondencia entre usuario y contraseña, mensaje */
      return next(null, false, { error: {'email o contraseña': 'inconrrectos'} });
    }
    return next(null, user);
  })
  .catch(next);
}));
