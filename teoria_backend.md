#¿Cómo sabe el servidor como atender las peticiones?
Para indicarle al servidor como reaccionar a cada petición se definen una serie de rutas. La respuesta de nuestro servidor dependerá de la ruta a la que se hace la petición y el método HTTP (GET, POST, etc.) que utiliza. La ruta es parte de la url de petición y va después del hostname. La url completa tiene la siguiente estructura:

<dirección del servidor>:<número de puerto>/<ruta de petición>

Por ejemplo, para nuestra aplicación sería:
localhost:400/gods

Otra forma de pasarle información al servicio directamente en la url de petición es mediante *query strings*, éstas aparecen al final de la url y se indican con un signo ? y se separan por un &. Por ejemplo:

localhost:4001/gods/Zeus?live=Underworld&symbol=eagle

Para acceder a la *query string* desde el servicio se utiliza el atributo *req.query* que nos regresa un objeto con la información recibida, un ejemplo sería:

{
  live : 'Underworld',
  symbol : 'eagle'
}

También _podemos recibir información en el cuerpo de la petición,_ ésta es la _forma más segura de transferir información_ pues no viene directamente en la url sino que viene como parte de la petición. En este caso _es el cliente el encargado de generar este cuerpo cuando hace su petición_ y para acceder a ella usamos el atributo *req.body*.