const express = require("express");
const mongoose = require("mongoose");
const user = require("./user.controller");
const app = express();
const port = 3000;

//Un middleware es una funcion que se va a ejecutar cuando realicemos cualquier tipo de peticion en la app.
//Por tanto, se ejecuta siempre. Se usa para realizar validaciones. Por ejemplo, sacar los datos de una peticion de POST
//y meterlos en la propiedad de body de nuestro objeto de request.

//Esto pilla todas las peticiones que vienen en formato JSON y las va a transformar en un objeto JS y los va a asignar
//a la propiedad de body.
app.use(express.json());
mongoose.connect("mongodb+srv://jon:jon@cluster0.7ucbwyy.mongodb.net/MiApp?retryWrites=true&w=majority");

//GET
app.get("/", user.list);

//POST
app.post("/", user.create);

//GET BY ID
app.get("/:id", user.get);

//PUT
app.put("/:id", user.update);

//PATCH
app.patch("/:id", user.update);

//DELETE
app.delete("/:id", user.destroy);

app.get("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

app.post("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

app.listen(port, () => {
    console.log("Arrancando la aplicacion");
})