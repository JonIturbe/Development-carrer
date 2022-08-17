import { GifGrid } from "../../src/components/GifGrid";
import { render, screen } from "@testing-library/react";

describe('Pruebas en <GifGrid />', () => {
    const category = "One Punch Man";

    test('Debe mostrar el loading al inicio', () => {
       
        render( <GifGrid category={ category } /> );
        expect( screen.getAllByText( "Cargando..." ) );
        expect( screen.getAllByText( category ) );

        // screen.debug();
    
    });
    
    test('Debe mostrar Items cuando cargan las imagenes', () => {
       
        render( <GifGrid category={ category } /> );
        expect( screen.getAllByText( "Cargando..." ) );
        expect( screen.getAllByText( category ) );
        // screen.debug();
    
    });

});
