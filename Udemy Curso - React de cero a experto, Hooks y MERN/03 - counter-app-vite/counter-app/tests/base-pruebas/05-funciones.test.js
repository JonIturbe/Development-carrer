import { getUser, getUsuarioActivo } from "../../src/base-pruebas-Fernando Herrera/05-funciones";

describe('Pruebas en 05-funciones', () => {
    test('getUser debe retornar un objeto', () => {
       
        const testUser = {
            uid: 'ABC123',
            username: "El_Papi1502"
        };

        const user = getUser();
        expect( testUser ).toEqual( user );
    });

    test('getUsuarioActivo debe retornar un objeto', () => {
       
        const name = "Fernando";
        const user = getUsuarioActivo( name );

        ////MI MODO
        // const testUser = {
        //     uid: 'ABC123',
        //     username: "Fernando"
        // };
        // expect( testUser.username ).toEqual( user.username );

        ////MODO DEL PROFE
        expect(user).toStrictEqual({
            uid:'ABC567',
            username:name
        });
    });
});
