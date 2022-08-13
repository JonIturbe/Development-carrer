import {getSaludo} from "../../src/base-pruebas-Fernando Herrera/02-template-string";

//Hay que hacer la configuracion/instalacion de babel para el testin con el siguiente comando:
// yarn add --dev babel-jest@babel/core@babel/preset-env

describe('Pruebas en 02-template-string ', () => {
    test('getSaludo debe retornar "Hola Fernando"', () => {
        
        const name = "Fernando";
        const message = getSaludo( name );

        expect( message ).toBe( `Hola ${ name }` );

    });
});
