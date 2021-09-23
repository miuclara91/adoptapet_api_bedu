module.exports = {
  /* Se define la variable secret dependiendo del ambiente en el que nos encontremos */
  secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "secret"
};
