import { getGifs } from "../../src/helpers/getGifts";

describe('Pruebas en getGifts', () => {
    test('Debe devolver un array de Gifs', async () => {
        
        const gifs = await getGifs("One Punch Man");
        // console.log(gifs);
        expect( gifs.length ).toBeGreaterThan( 0 );
        expect( gifs[0] ).toEqual( {
            id: expect.any( String ),
            title: expect.any( String ),
            url: expect.any( String )
        } );

    });
    
});
