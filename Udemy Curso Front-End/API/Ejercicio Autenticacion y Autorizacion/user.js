const mongoose = require("mongoose");

//Definimos el esquema que ha de tener nuestro objeto usuario. 
const User = mongoose.model("User", {
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
})

module.exports = User;