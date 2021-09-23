/** Clase que representa un animalito a adoptar */
/* class Mascota {
	constructor(id, nombre, categoria, fotos, descripcion, anunciante, ubicacion){
		this.id = id;
		this.nombre = nombre; // nombre de la mascota (o titulo del anuncio)
		this.categoria = categoria; // perro | gato | otro
		this.fotos = fotos; // links a las fotografías
		this.descripcion = descripcion; // descripción del anuncio
		this.anunciante = anunciante; // contacto con la persona que anuncia al animalito
		this.ubicacion = ubicacion; // muy importante
	}
	
	guardar(){
		// función para guardar un nuevo registro en la base de datos.
	}	
}

module.exports = Mascota; */

/* Modelación de Usuario con Mongoose */
const mongoose = require("mongoose");

/* La opción { timestamps: true } agrega automáticamente la hora y 
fecha de creación (createdAt and updatedAt) cada que se crea o actualiza un documento.
collection es en donde se define la colección de la base de datos 
a donde apunta este esquema. */

const MascotaSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true }, // nombre de la mascota (o titulo del anuncio),
		categoria: { type: String, enum: ['Perro', 'Gato', 'Otro'] }, // perro | gato | otro
		fotos: String,
		descripcion: { type: String, required: true },
		anunciante: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // el anunciante debe estar previamente registrado en usuarios
		ubicacion: String,
	}, { timestamps: true, collection: 'mascotas' });

MascotaSchema.methods.publicData = function () {
	return {
		id: this.id,
		nombre: this.nombre,
		categoria: this.categoria,
		fotos: this.fotos,
		descripcion: this.descripcion,
		anunciante: this.anunciante,
		ubicacion: this.ubicacion
	}
}

mongoose.model("Mascota", MascotaSchema);