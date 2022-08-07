import heroes from "./data/heroes";

const getHeroById = (id) => heroes.find( (heroe) => heroe.id === id);

const promesa = new Promise( (resolve, reject) => {
    setTimeout( () => {
        //Tarea a ejecutar. importar resolve
        resolve();
    }, 2000);
});

console.log("Then de la promesa");

//Metodos con promesas
//THEN: se ejecuta cuando la promesa se cumple correctamente
//CATHC: cuando la promesa da algun error
//FINALLY: se ejecuta despues de las anteriores, si o si

promesa.then( () => {
    console.log("Then de la promesa");
} );
