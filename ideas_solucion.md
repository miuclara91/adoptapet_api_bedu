Se podría utilizar un switchcase...

Validar antes que la constelación exista

La otra sería extraer el query string y compararlo con los que tenemos registrados

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