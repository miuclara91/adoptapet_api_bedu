/* Archivo que explica el proceso para la autenticación */
const jwt = require('express-jwt');
const secret = require('../config').secret;

/* En un HEADER se envía info de CONFIGURACIÓN, como un TOKEN */

// Obtenemos el JWT del HEADER de la petición y verificamos su existencia.
function getTokenFromHeader(req) {

  if (req.headers.authorization && (req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

const auth = {
  requerido: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    getToken: getTokenFromHeader
  }),
  opcional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;