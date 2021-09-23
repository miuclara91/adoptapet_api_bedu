const router = require("express").Router();
const {
    crearMascota,
    obtenerMascotas,
    modificarMascota,
    eliminarMascota,
    count
} = require("../controllers/mascotas");

/* Siempre se ponen las rutas que son más específicas y al final las que son las generales */
router.get("/", obtenerMascotas);
router.get("/count/:cat", count);
router.get("/:id", obtenerMascotas);
router.post("/", crearMascota);
router.put("/:id", modificarMascota);
router.delete("/:id", eliminarMascota);

module.exports = router;