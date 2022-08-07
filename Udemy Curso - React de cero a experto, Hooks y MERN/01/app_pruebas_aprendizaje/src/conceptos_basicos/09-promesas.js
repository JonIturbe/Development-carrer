import heroes from "./data/heroes";

const getHeroById = (id) => heroes.find( (heroe) => heroe.id === id);
const getHeroByOwner = (owner) => heroes.find( (heroe) => heroe.owner === owner);

// const promesa = new Promise( (resolve, reject) => {
//     setTimeout( () => {
//         //Tarea a ejecutar. importar resolve
//         // resolve();
//         const heroe = getHeroById(2);
//         resolve(heroe);
//         // reject("No se pudo encontrar el heroe");
//     }, 2000);
// });

//Metodos con promesas
//THEN: se ejecuta cuando la promesa se cumple correctamente
//CATHC: cuando la promesa da algun error
//FINALLY: se ejecuta despues de las anteriores, si o si

// promesa.then( (heroe) => {
//     console.log("Heroe resultante: ", heroe);
// } )
// .catch( err => console.warn( err ) );

const getHeroByIdAsync = (id) => {
    return (new Promise( (resolve, reject) => {
    setTimeout( () => {
        const heroe = getHeroById(id);
        if(heroe){
            resolve(heroe);
        }else{
            reject("No se pudo encontrar el heroe");
        }
    }, 1000);
    })
    );
}

getHeroByIdAsync(3)
.then( console.log )
.catch( console.warn );