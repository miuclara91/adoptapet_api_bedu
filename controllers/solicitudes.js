const mongoose = require("mongoose");
const Solicitud = mongoose.model("Solicitud");

// CRUD

// C => CREATE
function crearSolicitud(req, res, next){
	const solicitud = new Solicitud(req.body);
	solicitud.saved()
	.then(sol => res.status(200).send(sol))
	.catch(next);
}

// R => READ
function obtenerSolicitud(req, res, next){
	if(req.params.id){
		Solicitud.findById(req.params.id)
		.then(sol => {res.send(sol)})
		.catch(next)
	} else{
		Solicitud.find()
		.then(solicitudes => {res.send(solicitudes)})
		.catch(next)
	}
}

// U => UPDATE
function modificarSolicitud(req, res, next){
	Solicitud.findById(req.params.id)
	.then(solicitud => {
		if(!solicitud){return res.sendStatus(404)}

    let nuevaInfo = req.body;

    if (typeof nuevaInfo.idUsuarioAnunciante !== "undefined"){
      solicitud.idUsuarioAnunciante = nuevaInfo.idUsuarioAnunciante;
    }

    if(typeof nuevaInfo.idUsuarioSolicitante !== "undefined"){
      solicitud.idUsuarioSolicitante = nuevaInfo.idUsuarioSolicitante;
    }

    if(typeof nuevaInfo.estado !== "undefined"){
      solicitud.estado = nuevaInfo.estado;
    }

    solicitud.save()
    .then(updated => {res.status(201).json(updated.publicData())})
    .catch(next)
	})
	.catch(next)
}

// D => DELETE
function eliminarSolicitud(req, res, next){
	Solicitud.findOneAndDelete({_id: req.params.id })
	.then(r => {res.status(200).send("La solicitud se eliminó")})
	.catch(next);
}

function countIdMascota(req, res, next){
	const idMascota = req.params.id;
	Solicitud.aggregate([
		{"$match": {"id": idMascota}},
		{"$count": "total"}
	]).then(r => {
		res.status(200).send(r);
	})
	.catch(next);
}

module.exports = {
	crearSolicitud,
	obtenerSolicitud,
	modificarSolicitud,
	eliminarSolicitud,
	countIdMascota
}

