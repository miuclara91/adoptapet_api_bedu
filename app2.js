// Express es un módulo de Node, así que es necesario importarlo para poder utilizarlo.
const express = require("express");

// Una vez importado creamos una instancia de aplicación de express al cual llamaremos app.
const app = express();

// Usamos bodyparser para que convierta en json los params de body
/* Para poder acceder al body es necesario definir un mecanismo que lo parsee para 
convertirlo en un objeto de JavaScript. Recordemos que la API se encarga también 
de la compatibilidad de los datos entre las aplicaciones. 
Nosotros vamos a usar body-parser que es una biblioteca de JavaScript 
que traduce el body de un request. Para usarla agregamos las siguientes lineas 
antes de la definición de los servicios.*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* Con la aplicación que creamos podemos iniciar un servidor que se encargará de escuchar 
las peticiones que se hagan a nuestra API y responderlas, pero para esto tenemos que 
indicarle en dónde escuchar peticiones dándole un puerto especifico. 
Para esto contamos con el método listen(). */
const PORT = 4001;


/* Como primer parámetro de listen() le pasamos el puerto que va a estar escuchando 
y como segundo un callback que se ejecuta una vez que el servidor está corriendo 
y listo para recibir peticiones. */
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

/* Como desarrolladoras y desarrolladores de la API es nuestra tarea decirle al servidor 
como debe responder en cada una de las rutas. Para esto Express tiene métodos definidos 
para cada uno de las peticiones HTTP, por ejemplo, si la petición es un GET, 
usamos el método app.get() que funciona de la siguiente forma: 

app.get('/gods', (req, res, next) => {
  // Aquí construimos y enviamos la respuesta 
});

Analicemos los parámetros:

'/gods' es la ruta de petición que estamos definiendo
(req, res, next) => {...} es el callback que define el comportamiento. 
En el callback req representa la petición hecha (request) mientras que res es la respuesta 
que eventualmente se tiene que enviar.
Si no está definida la ruta sobre la cual se hace la petición, 
Express enviará un código 404 como respuesta.

Para definir el comportamiento del servidor bajo cierta ruta tenemos que construir 
la respuesta y enviarla al cliente.
Para cada petición se espera una única respuesta y todas las peticiones 
deben ser respondidas. Recordemos que res modela la respuesta del servidor, 
y tiene un método .send() que se encarga de enviarla.
*/

const gods = [{ name: "Zeus" }, { name: "Hades" }, { name: "Hermes" }];

app.get("/gods", (req, res, next) => {
  res.send(gods);
});

/* Las rutas también pueden utilizarse de forma dinámica, 
 esto se puede lograr en Express con los route parameters, 
 estos son segmentos de la ruta de petición y se definen en la API comenzando con : en la 
 definición de la ruta. Por ejemplo /gods/:id, esta ruta va a hacer match con la petición 
 sobre gods/6 y también con gods/456. Express extrae los valores de los parámetros 
 para que podamos usarlos en la definición del servicio. */

const gods2 = {
  Zeus: { live: "Olympus", symbol: "Thunderbolt" },
  Hades: { live: "Underworld", symbol: "Cornucopia" },
};

app.get("/gods2", (req, res, next) => {
  res.send(gods2);
});


/* app.get('/gods2/:name', (req, res, next) => {
  res.send(gods2[req.params.name]);
}); */

/* En el código anterior req.params.name guarda el valor del parámetro name enviado 
en la ruta de la petición. Y la petición GET sobre la ruta /gods/Zeus va a regresar 
{ live: 'Olympus', symbol: 'Thunderbolt' }. */

/* Recordemos que todas las respuestas de un servidor tienen un código HTTP asociada 
que describe la ejecución. Hasta ahora Express se ha encargado de definir el código 
de respuesta por nosotros, pero también podemos decirle explícitamente cuál queremos enviar. 
Para eso existe el método .status() del objeto res (response). 
Por ejemplo, podemos enviar un código 404 si nos piden un dios que no tenemos registrado, 
entonces nuestro servicio se define como sigue: */

app.get("/gods2/:name", (req, res, next) => {
  const good = gods2[req.params.name];
  if (good) {
    res.send(good);
  } else {
    res.status(404).send("Good Not Found");
  }
});

// El servicio para modificar los dioses griegos que tenemos guardados seria:
app.put('/gods2/:name', (req,res) => {
  // Escribimos los cambios que deseamos realizar en Body > raw tipo JSON
  const god = req.body;
  gods2[req.params.name] = god;
  res.send(gods2);
});

/* Para agregar un nuevo dios definimos el siguiente servicio. En este servicio,
la información del dios que crearemos viene en el body de la petición, 
mientras que el nombre está dado como query string. */

app.post('/gods2', (req, res) => {
  // Escribimos el nuevo nombre del dios en Params, en la key ponemos name y en value, el nombre del dlios
  const name = req.query.name
  // Escribimos los cambios que deseamos realizar en Body > raw tipo JSON
  const newGod = req.body;
  gods2[name] = newGod;
  res.status(200).send(gods2);
});

// Definimos el servicio que elimina un dios.
app.delete('/gods2/:name', (req, res) =>{
  const name = req.params.name;
  if (delete gods2[name]){
    res.send(gods2);
  } else {
    res.status(500);
  }
});


// Reto 1
const constelaciones = {
  Andromeda: {
    abreviatura: "And",
    superficie: 722.3,
    num_estrellas: 152,
    estr_mas_brillante: "Alpheratz",
  },

  Ara: {
    abreviatura: "Ara",
    superficie: 237.1,
    num_estrellas: 71,
    estr_mas_brillante: "Beta Arae",
  },

  Centaurus: {
    abreviatura: "Cen",
    superficie: 1060.4,
    num_estrellas: 281,
    estr_mas_brillante: "Alfa Centauri",
  },

  Crater: {
    abreviatura: "Crt",
    superficie: 282.4,
    num_estrellas: 33,
    estr_mas_brillante: "Labrum",
  },

  Draco: {
    abreviatura: "Dra",
    superficie: 1083,
    num_estrellas: 211,
    estr_mas_brillante: "Etamin",
  },
};

// Reto 02
app.get("/cons", (req, res, next) => {
  res.send(constelaciones);
});

// Reto 02
// Get para obtener una constelación por su nombre
app.get("/cons/:star", (req, res, next) => {
  const star = constelaciones[req.params.star]; 
  if (star) {
    res.send(star);
  } else {
    res.status(404).send("Cons Not Found");
  }
});

// Get para obtener la abreviatura
app.get("/cons/:star/abrev", (req, res, next) => {
  const starAbrev = constelaciones[req.params.star]["abreviatura"];
  
  if (starAbrev) {
    res.send(starAbrev);
  }  
});

// Get para obtener la superficie
app.get("/cons/:star/super", (req, res, next) => {
  const starSuper = constelaciones[req.params.star]["superficie"];
  
  if (starSuper) {
    res.send(starSuper.toString());
  }  
});

// Get para obtener el número de estrellas
app.get("/cons/:star/numbersStars", (req, res, next) => {
  const numbStars = constelaciones[req.params.star]["num_estrellas"];

  if (numbStars) {
    res.send(numbStars.toString());
  }  
});

// Get para obtener la estrella + brillante
app.get("/cons/:star/shiny", (req, res, next) => {
  const shineStar = constelaciones[req.params.star]["estr_mas_brillante"];
  
  if (shineStar) {
    res.send(shineStar);
  }  
});

app.put('/cons/:name', (req,res) => {
  const star = req.body;
  constelaciones[req.params.name] = star;
  res.send(constelaciones);
});

app.post('/cons', (req, res) => {
  const newStar = req.query.name;
  const newChars = req.body;
  constelaciones[newStar] = newChars;
  res.status(200).send(constelaciones);
});

app.delete('/cons/:name', (req, res) =>{
  const star = req.params.name;
  if (delete constelaciones[star]){
    res.send(constelaciones);
  } else {
    res.status(500);
  }
})

