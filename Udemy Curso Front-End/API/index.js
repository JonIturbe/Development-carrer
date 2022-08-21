//Importamos la libreria de mongoose con el require.
const mongoose = require("mongoose");

//Ahora nos conectamos a nuestra BBDD en la nube. Le pasamos como argumento la url de Mongo Atlas.
//Sustituimos la palabra password por nuestra contraseña.
//"mongodb.net/MiApp?retryWrites". Entre el / y el ? escribimos el nombre que queremos que tenga nuestra BBDD. 
mongoose.connect("mongodb+srv://jon:jon@cluster0.7ucbwyy.mongodb.net/MiApp?retryWrites=true&w=majority");

//Un modelo es la definicion de como queremos que se vean nuestros documentos.
//Declaramos que los usuarios van a tener un nombre User y de tipo objeto de JSON.
//Por convencion, los modelos se escriben con Mayuscula (la primera letra). Sus instancias, con minuscula. 
const User = mongoose.model("User", {
    username : String,
    edad : Number,
});

//Funcion asincrona para crear usuarios.
const crear = async () => {
    const user = new User({username:"Marta", edad:26});
    //Ahora lo guardamos en la BBDD. save() devuelve una promesa, por lo que podemos usar .then().
    const saveUser = await user.save();
    //Tras guardar en una varibale el resultado del guardado en la BBDD, lo imprimimos. 
    console.log(saveUser);
}
// crear();

const buscarTodosUsers = async () => {
    const users = await User.find();
    console.log(users);
}
// buscarTodosUsers();

//Await se usa porque nos devuelve una promesa, por lo que hay que usar eso o el .then. El await
//viene a ser como un: espera a que esto se ejecute.
const buscar = async () => {
    const user = await User.find({ username: "Jon"});
    console.log(user);
}
// buscar();

//Usando findOne nos aseguramos de que solo nos devuelve un resultado.
//Con find() devuelve todos los objetos que tengan el valor que le hemos pasado. 
const buscarUno = async () => {
    const user = await User.findOne({ username: "Marta" });
    console.log(user);
}
// buscarUno();

const actualizar = async () => {
    const user = await User.findOne({ username: "Jon" });
    user.edad = 28;
    await user.save();
    console.log("Usuario actualizado: \n", user);
}
// actualizar();

const eliminar = async () => {
    const user = await User.findOne({ username: "Marta" });
    if (user){
        //Solo se puede llamar a .remove() siempre que el recurso llamado exista. Si no, devuelve un error.
        await user.remove();
        console.log("Usuario eliminado");
    } else{
        console.log("El usuario no existe");
    }
}
// eliminar();