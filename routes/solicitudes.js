const router = require('express').Router();

const {
	crearSolicitud,
	obtenerSolicitud,
	modificarSolicitud,
	eliminarSolicitud,
	countIdMascota
} = require('../controllers/solicitudes');

router.get('/', obtenerSolicitud);
router.get('/count/:id', countIdMascota);
router.post('/', crearSolicitud);
router.put('/:id', modificarSolicitud);
router.delete('/:id', eliminarSolicitud);

module.exports = router;
