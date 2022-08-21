//Esto es el print de js
// console.log('Hola Mundo');
//Poner ; al final de las sentencias no es obligatorio en JS, pero si recomendable.
//Puedes comentar una linea del tiron con ctrl + ç.

//TIPOS DE DATOS
//String: cadena de caracteres. Sirven tanto las comillas dobles como las comillas simples :D
//Boolean: true o false. 
//Null: es un valor nulo. Significa vacio. Variable definida cuyo valor es nulo.
//Number: cualquier numero. 
//Undefined: no se encuentra definido. Variable que no ha sido definida. No es como null.
//Object: es un objeto. Estructuras que agrupan los anteriores tipos de datos. 

//DEFINICION DE VARIABLES
//Se usa: var, let o const.
//var: hace la asociacion, pero pone todas las declaraciones de var arriba del codigo.
//let: 
//const: no nos deja cambiar el valor que contiene la variable declarada con const.

let variable = "Soy la primera variable";
// console.log(variable);

variable = "Ahora ya no soy una variable. Ahora soy una hija de fruta";
// console.log(variable);

let elBueno = true;
let elMalo = false;

let numero = 12;
let otroNumero = 2;
// console.log(numero+otroNumero);

//OBJETOS
//Objeto vacio
const obj = {};

//Objeto normal con diferentes tipos de datos o propiedades
const newObj = {
    unNumero : 12,
    unString : "Pelotudo",
    unaCondicion : true,
}
//Es una buena practica poner la coma aun siendo la ultima propiedad, pero no es necesario.

// console.log(newObj);
// console.log(newObj.unString);

//ARRAYS
const arrVacio = [];
const arr = [1, 22, "Soy un string :D", newObj];
// console.log(arrVacio, arr);

//añadir elementos al array
arr.push(5);
// console.log(arr);

//RESUMEN
//OBJETOS = {:}
//ARRAY = []

const suma = 1 + 2;
const resto = 10 % 3;
// console.log(resto);

//OPERADORES DE COMPARACION
// ==, ===, <, >, <=, >=, !=, !==
// === significa equivalencia estricta. Si es exactamente lo mismo.
let res1 = 5 === 6;
// == no es tan estricto, es una comparacion normal.
let res2 = 5 == 6;

// Esto daria True, pero si utilizamos el === daria false. Esa es la diferencia.
let res3 = 5 == '5'
// Aqui, no sería extrictamente desigual uno de otro.
let res4 = 5 != '5'

//OPERADORES LOGICOS
// or ||, and &&, not !

//CONTROL DE FLUJO
//IF
if (5 < 4) {
    // console.log("Exito para el pelotudo");
} else {
    // console.log("Ja! menudo gay");
}

//WHILE
let i = 0;
while (i < 10) {
    // console.log(i+1, "- Mariicaaaaa");
    i++;
}

//SWITCH
//No hace falta ponerle llaves a los casos, pero se puede hacer por legibilidad.
switch (11) {
    case 1: 
        // console.log("Gay");
        break;
    case 2: 
        // console.log("Joder, menudo Gay");
        break;
    case 3:
        // console.log("MMMM viejo sabroso");
        break;
    default:
        // console.log("(V)(º;;;º)(V)");
        break;
}

//FOR
for (let i = 0; i < 10; i++) {
    // console.log("Sumando valores a i: ", i);
}

const numeros = [12,27,86,"Texto loco",55];
for (let i = 0; i < numeros.length; i++) {
    // console.log("Valor dentro de array: ", numeros[i]);
}

//FUNCIONES
function nombreFuncion(argumento) {
    for (let i = 0; i < argumento.length; i++) {
        console.log("Valor dentro de array: ", argumento[i]);
    }
}

const arg1 = [12,27,86,"Texto loco",55];
const arg2 = ["Pedro", "Juan", "Marta", "Paco"];

// nombreFuncion(arg1);
// nombreFuncion(arg2);

function sumador(a, b) {
    //console.log(a + b);
    return a + b;
}

let resSuma = sumador(1,2);
// console.log("Resultado de la suma: ", resSuma);

//CALLBACKS
//Un callback es una funcion que se ejecuta al final de otra funcion.
function sumar(a, b, callback){
    let r = a + b;
    callback(r);
}

function callback(result) {
    // console.log("Resultado: ", result);
}

//Si le pasamos la llamada a una funcion como argunmento, no tenemos que ponerle los parentesis despues.
//Ya que si hacemos eso, estariamos ejecutando la funcion ahi mismo, no la pasariamos a la otra como argumento.
sumar(2, 3, callback);

//Las funciones en JS son valores y como tales los podemos pasar como argumentos a otra funciones para 
//crear comportamientos.

//FAT ARROW FUNCTIONS
//Diferencias con las funciones normales:
//No tienen que declararse con la palabra function.
//Tampoco es necesario darle un return, pues esta implicito en la misma.

const miFatArrowFunction = (a, b) => a + b;
//La declaramos como una variables. Le pasamos argumentos. Escribimos la logica.
//console.log(miFatArrowFunction(1, 2));

//En caso de que necesitemos que la funcion sea de mas de una linea, se hace del siguiente modo:
const otraFAF = (a, b) => {
    return a + b;
}

let rr = otraFAF(231, 22);
// console.log(rr);

//FUNCIONES ANONIMAS
//Funciones sin nombre. Se usan a traves de otras funciones, como en los callbacks.
//No se llaman desde ninguna otra parte de la aplicacion. No son reutilizables. 

sumar(2, 3, function (r) {
    console.log("Soy una funcion anonima con resultado: ", r);
})

//MAS FUNCIONALIDADES DE JS
//Spread operator se usa cuando queremos generar una copia exacta de un objeto y que 
//si la editamos, no cambie a la original.
const a = {b: 1}

//Si ahora hiciesemos const b = a, b seria literalmente igual que a, por lo que si 
//modificasemos b también lo hariamos en a y eso no es lo que queremos.

//Esto significa: crea un objeto y luego toma todas las propiedades del objeto a y 
//asignaselas a este nuevo objeto que estamos creando.
const c = {...a}

//PROMESAS
//Es un valor que se va a resolver eventualmente en el futuro.
//Promise nos permite resolver de forma asincrona valores.
Promise.resolve(2)
    //Then va a tener el valor de la promesa cuendo estar se resuelva en un futuro.
    .then(valor => valor + 1)
    //Las promesas se pueden ir encadenando. Aunque se llamen igual, los dos valor son
    //varibales diferentes porque cada una esta en un metodo then diferente.
    .then(valor => console.log(valor))
    //Otro metodo es catch. Recibe un mensaje de error.
    .catch(e => console.error(e))

//Con reject hacemos que se salte el then y vaya al catch directamente.
Promise.reject(2)
    .then(valor => valor + 1)
    .then(valor => console.log(valor))
    .catch(e => console.error(e))

//New promise sirve para resolver de manera asincrona.
new Promise((resolve, reject) => {
    //Lo resuelve despues de 1 segundo.
    setTimeout(() => resolve(2), 1000)
}).then(z => console.log(x))
.catch(e => console.error(e))