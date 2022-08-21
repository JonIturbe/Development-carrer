const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { expressjwt: jwt2 } = require("express-jwt");
//Como el archivo de user se encuentra en la misma carpeta que este, tenemos que poner en la 
//ruta el punto y la barra (./) antes del nombre del archivo
const User = require("./user");

//Conexion con la BBDD de mongo
mongoose.connect("mongodb+srv://jon:jon@cluster0.7ucbwyy.mongodb.net/Authentication?retryWrites=true&w=majority");

//Creamos app a partir de express
const app = express();
//Le decimos a la app que utilice lo de abajo para recibir los datos enviados a la api en formato json
app.use(express.json());

//Una variable de entorno es una variable que se encuentra corriendo en nuestro sistema operativo
//Si en el cmd escribes => export SECRET=mi-string-secreto => lo que hara sera dejar definida esa
//variable en el SO. Para ver las variables de entorno, escribe env. Todo esto solo funciona con
//gitbash. Con console.log(process.env.SECRET) imprimiras esa variable. Para ocultar el codigo secreto
//solo quedaria sustituir la declaracion original por process.ev.SECRET y ya esta
//Evidentemente, esto funciona solo cuando trabajamos en nuestro pc. Cuando hagamos el paso de produccion de
//nuestras apps tendremos que usar la configuracion de los servicios que vamos a usar para pasar a produccion nuestro codigo

//Para validar los json web tokens que vamos a recibir:
//Le tenemos que pasar un objeto que contenga la propiedad de secret, que es el string secreto usado para
//firmar nuestros jwt. Luego le pasamos el algoritmo que usamos para encriptar los tokens. Usaremos 
//algorithms, donde pasaremos un array con el nombre del algoritmo
const validateJwt = jwt2({ secret: "mi-string-secreto", algorithms: ["HS256"] });


//Funcion que recibe un _id y lo encripta
const signToken = _id => jsonwebtoken.sign({ _id }, "mi-string-secreto");


//Una vez creado el modelo del usuario
//Primer endpoint a crear -> register para poder registrarse
app.post("/register", async (req, res) => {
    //Tenemos que sacar el body de nuestro objeto de request, donde estara el email y el pass ingresado por el usuario
    const { body } = req;
    console.log({body});
    //Aqui meteremos posibles errores de conexion, llamada a BBDD, usuario no existe y otros posibles fallos de conexion
    try {
        //Primero buscamos si ya existe el usuario. Le buscamos por el correo, que se encuentra dentro del body
        const isUser = await User.findOne({ email: body.email });
        //Si isUser existe...
        if(isUser){
            //Status 403 -> No esta permitida la operacion
            //El return impide que se ejecute nada que haya debajo
            return res.status(403).send("Este usuario ya existe.");
        }
        //Creamos el salt para encriptar la contraseña
        const salt = await bcrypt.genSalt();
        //Tenemos que pasar la conrtaseña recibida a traves de la peticion de post, que esta dentro de body y la propiedad
        //se llama password. El segundo argumento que recibe es el salt
        const hashed = await bcrypt.hash(body.password, salt);
        //Con la contraseña encriptada podemos crear al usuario
        const user = await User.create({
            email: body.email,
            password: hashed,
            salt
        });
        //Funcion para encriptar el id del usuario que utilizaremos como token
        //Le pasamos el objeto _id que contiene el _id del user
        //Despues tenemos que decirle como vamos a ecnriptar ese jason web token. El string debe ser un secreto,
        //es algo que debe quedar oculto
        const signed = signToken(user._id);
        //Devolvemos el id del usuario. 
        //201 -> Se ha creado un recurso
        res.status(201).send({signed});

    } catch (err) {
        console.log({err});
        //En caso de fallo, devuele status 500 y un mensaje con el error. Se podria dejar solo el err (sin el .message)
        res.status(500).send(err.message);
    }
})

app.post("/login", async (req, res) => {
    const { body } = req;
    try{
        const user = await User.findOne({ email: body.email });
        if (!user){
            res.status(403).send("Usuario y/o contraseña invalidos.");
        } else {
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (isMatch){
                const signed = signToken(user._id);
                res.status(200).send(signed);
            } else {
                res.status(200).send(signed);
            }
        }
    }catch (err) {
        res.status(403).send("Usuario y/o contraseña invalidos.");
    }
});

//Aprendiendo a usar los middlewares en express
//Hacemos un endpoint normal al que le pasamos un tercer argumento: es como que, al acabar esta funcion
//llamara a otra. 
app.get("/middle", (req, res, next) => {next()}, (req, res, next) => {
    console.log("La puta madre que es esto.");
    res.send("OK");
});

app.get("/middle2", (req, res, next) => {
    req.user = { id: "Maricona" }
    next();
}, (req, res, next) => {
    console.log("La puta madre que es esto.", req.user);
    res.send("OK");
});

//Cuando llamamemos a este endpoint, tenemos que poner "Bearer" en el valor del campo de authorization para que
//pille el token. Nos devolvera el id encriptado y el iat (Issued AT) cuando fue genera ese web token. Esto puede ser
//util para caducar los jwt y no usar siempre el mismo, este valor se crea por defecto

const findAndAssingUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.auth._id);
        if (!user) {
            return res.status(401).end(); 
        }
        req.auth = user;
        next();
    } catch (e) {
        next(e);
    }
}

//Cuando queremos proteger una ruta le pasamos el middleware de validatjwt.
//Luego le pasamos el middleware findAndAssingUser y finalmente le damos
//la logica del endpoint

//.use() es lo que nos va a permitir componer nuestros middlewares (le pasamos los dos que queramos unir)
const isAuthenticated = express.Router().use(validateJwt, findAndAssingUser);

app.get("/validate", isAuthenticated, (req, res) => {
    //throw new Error("ERROR");
    res.send(req.auth);
});


//Esta manera de hacerlo es optimizable. Express permite "unir" esos dos middlewares en
//uno, de modo que solo tengamos que hacer una llamada en lugar de dos

// console.log("Endpoint para validar jwt llamado.", req.auth);
// res.send("OK");

//Para proteger los endpoints lo que vamos a hacer es usar middlewares antes de la logica que 
//implementemos para poder manejar las peticiones de los usuarios

//Cremos un middleware especial para controlar los posibles errores que puedan surgir, ya que
//express los atrapa todos
app.use((err, req, res, next) => {
    console.log("Mi nuevo error", err.stack);
    next(err);
});
app.use((err, req, res, next) => {
    res.send("Ha ocurrido un error :(");
});


//Script para que la app se ejecute
//Le pasamos el puerto que vamos a usar
app.listen(3000, () => {
    //Codigo que se ejecutara al iniciar la app
    console.log("--- Listening in port 3000 ---");
})