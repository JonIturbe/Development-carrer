//Asignacion del framework de express. Require sirve para que podamos importar
//dependencias de terceros. Entre comillas escribirmos el nombre de la dependencia.
const express = require("express");
//Importamos en la constante user, lo que exporte el js user.controller.
const user = require("./user.controller");
//Creamos variable app que se creara al ejecutar el metodo de express.
const app = express();
//Especificar en que puerto queremos que la app se ejecute.
const port = 3000;

// //Le pasamos a express la ruta del navegador que tenemos que escribir para que se
// //ejecute la funcion que le vamos a pasar a esta misma funcion, pero como segundo argumento.
// //Osea, le pasamos la raiz.
// //Ej: al escribir->     localhost:3000/     Se ejecutara la funcion que este de segundo argumento.
// //req es request (forma estandar de darle un nombre corto a este argumento). La peticion del cliente con su info.
// //res es response (objeto). Esto es para que podamos enviarle info al usuario.
// app.get("/", (req, res) => {
//     //Status nos permite indicarle al cliente si la respuesta ha tenido exito y si viene acompañada de info.
//     //200 significa: OKAY aqui hay datos.
//     res.status(200).send("Menuda liada");
// })

//FORMA MAS EFICIENTE CARGADA DE OTRO ARCHIVO USANDO USER.
//Esto es exactamente lo mismo que el get de arriba.
//GET
app.get("/", user.list);

// //Aunque sea otro endpoint con la misma ruta, no va a chocar.
// //Con post no se puede acceder desde un navegador. Hace falta una herramienta extra como postman.
// //Solo tendrias que poner el POST y en el requested URL le pones-> localhost:3000/
// app.post("/", (req, res) => {
//     //200 -> OKAY + datos existentes de vuelta.
//     //201 -> OKAY creado (sin datos de vuelta al cliente).
//     //204 -> OKAY sin contenido (no se devuelve nada).
//     res.status(201).send("Atendiendo peticion");
// })

//POST
app.post("/", user.create);

// app.get("/:id", (req, res) => {
//     console.log(req.params);
//     res.status(200).send(req.params);
// })

//GET BY ID
app.get("/:id", user.get);

// //El id quiere decir que va a ser un dato variable pero que va a aparecer en la ruta.
// app.put("/:id", (req, res) =>{
//     //sendStatus inidca que solo le voy a devolver el estado. Status setea el estado que va a tener la
//     //peticion, pero luego podamos llamar a send para enviar mas datos.
//     console.log(req.params);
//     res.sendStatus(204);
// })

//PUT
app.put("/:id", user.update);

// app.patch("/:id", (req, res) =>{
//     res.sendStatus(204);
// })

//PATCH
app.patch("/:id", user.update);

// app.delete("/:id", (req, res) => {
//     res.sendStatus(204);
// })

//DELETE
app.delete("/:id", user.destroy);

//Manera de controlar todas las rutas no existentes que pueda buscar un usuario. De modo que no aparezca
//una simple pantalla en blanco en el navegador y que ponga error 404 not found y asi.
//Hay que venirse al final de las declaraciones y antes del app.listen.
//Esta ruta significa: quiero que manejes todas las rutas que no se encuentres definidas antes de mi.
app.get("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

//Ya que esto solo funciona para el comando GET, hay que hacerlo para el resto de los mismos.
//Aunque no tiene mucho sentido porque esto es ingresar un nuevo dato. Tiene sentido en sentencias 
//como GET, donde el usuario puede escribir mal un campo a buscar por ejemplo.
app.post("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

app.listen(port, () => {
    //Esto se va a ejecutar cuando la app este corriendo con exito.
    console.log("Arrancando la aplicacion");
})

//Ahora, si en la consola escribimos: "node .\api.js" para iniciar la api, podemos ir a un navegador y poner:
//localhost:3000 y nos llevara a una pagina en la que, en este caso, veremos el mensaje "Menuda liada". 

//END-POINT: es una ruta a la que puedes llegar, ya sea desde una peticion realizada desde un explorador o un dispositivo.