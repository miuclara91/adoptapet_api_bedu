// importamos las dependencias necesarias
const router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('Welcome to adoptapet api');
});

router.use('/usuarios', require('./usuarios'));
router.use('/mascotas', require('./mascotas'));
router.use('/solicitudes', require('./solicitudes'));

// exportamos nuestro nuevo router
module.exports = router;
