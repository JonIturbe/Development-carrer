import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas-Fernando Herrera/08-imp-exp";
import { heroes } from "../../src/data/heroes";

describe('Pruebas en 08-imp-exp', () => {
    test('getHeroeById debe retornar un heroe por ID', () => {
    
        const id = 1;
        const hero = getHeroeById( id );
        // console.log(hero);
        expect( hero ).toEqual( { id: 1, name: 'Batman', owner: 'DC' } );
    });

    test('getHeroeById debe retornar undefined si el ID no existe', () => {
    
        const id = 100;
        const hero = getHeroeById( id );
        expect( hero ).toBeFalsy();
    });

    test('getHeroesByOwner debe retornar un array con los personajes de DC', () => {
        const oid = "DC";
        const owner = getHeroesByOwner( oid );
        // console.log(owner);

        expect(owner.length).toBe(3);
        expect(owner).toEqual([
            {id:1,name:'Batman',owner:'DC'},
            {id:3,name:'Superman',owner:'DC'},
            {id:4,name:'Flash',owner:'DC'}
        ]);

        expect( owner ).toEqual( heroes.filter( (heroe) => heroe.owner === oid ));
        
        owner.forEach( elm => {
            expect( elm.owner ).toEqual( oid );
            // console.log(elm.owner);
        });
    });

    test('getHeroesByOwner debe retornar un array con los personajes de Marvel', () => {
        const oid = "Marvel";
        const owner = getHeroesByOwner( oid );
        // console.log(owner);

        expect(owner.length).toBe(2);
        expect( owner ).toEqual( heroes.filter( (heroe) => heroe.owner === oid ));
        
        owner.forEach( elm => {
            expect( elm.owner ).toEqual( oid );
            // console.log(elm.owner);
        });
    });
});
