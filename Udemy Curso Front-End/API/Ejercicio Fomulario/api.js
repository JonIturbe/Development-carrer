const express = require("express");
const mongoose = require("mongoose");
const user = require("./user.controller");
const app = express();
const port = 3000;

app.use(express.json());
mongoose.connect("mongodb+srv://jon:jon@cluster0.7ucbwyy.mongodb.net/MiApp?retryWrites=true&w=majority");

app.get("/users", user.list);
app.post("/users", user.create);
app.get("/users/:id", user.get);
app.put("/users/:id", user.update);
app.patch("/users/:id", user.update);
app.delete("/users/:id", user.destroy);

//Al usar express, tenemos que usar un middleware para que pille los archivos externos.
//Tienes que ir a buscar una carpeta y todos los archivos de su interior.
//Le pasamos el nombre de la carpeta.
app.use(express.static("app"));

app.get("/", (req, res) => {
    //Le enviamos un archivo HTML al usuario. Necesitamos decirle donde esta.
    //__dirname le dice a sendFile donde estamos. Despues, le pasamos el archivo.
    //console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
})

app.get("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

app.post("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

app.listen(port, () => {
    console.log("Arrancando la aplicacion");
})