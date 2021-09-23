# Modelo: Utilizando Programación Orientada a Objetos

Continuando con AdoptaPet, podemos identificar cuatro entidades principales:

* Mascota: Se refiere al animalito que los administradores registran y que los usuarios pueden adoptar.
* Usuario: hay dos tipos de usuarios de nuestra aplicación, el tipo normal que busca adoptar una mascota y el tipo anunciante que puede ser el cuidador de la mascota o del centro de adopción. Se encarga de registrar a las mascotas y de contactarse con los usuarios cuando estos envían una solicitud, así como de aprobarla y rechazarla.
* Solicitud: Una solicitud puede ser creada por un usuario para ponerse en contacto con el administrador y adoptar a una mascota.

Estos cuatro elementos serán nuestros modelos. Utilizando programación orientada a objetos podemos crear una clase para cada uno y así posteriormente el usuario podrá utilizar estos modelos creando instancias y obteniéndolas.

La sintaxis (req, res) => { ... } representa una función que será ejecutada cuando llegue alguna petición en las direcciones uri que especificamos, también se le puede llamar handler o callback.

Es una buena práctica colocar la versión de nuestra app como una ruta principal, ya que así en un futuro si hay un cambio demasiado grande puede mantenerse funcionando ambas apis y conservar compatibilidad.